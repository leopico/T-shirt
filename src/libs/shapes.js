import { v4 as uuidv4 } from "uuid";
import { fabric } from "fabric";
import axios from "axios";
import { errorNotify, successNotify } from "@/pages/utils/notification";

export const createText = (pointer, text) => {
  return new fabric.IText(text, {
    left: pointer.x,
    top: pointer.y,
    fill: "#aabbcc",
    fontFamily: "Helvetica",
    fontSize: 36,
    fontWeight: "400",
    objectId: uuidv4(),
  });
};

export const createSpecificShape = (shapeType, pointer) => {
  switch (shapeType) {
    case "text":
      return createText(pointer, "Tap to Type");

    default:
      return null;
  }
};

export const handleDelete = (canvas) => {
  const activeObjects = canvas.getActiveObjects();
  if (!activeObjects || activeObjects.length === 0) return;

  if (activeObjects.length > 0) {
    activeObjects.forEach((obj) => {
      if (!obj.objectId) return;
      canvas.remove(obj);
    });
  }

  canvas.discardActiveObject();
  canvas.requestRenderAll();
};

export const handleImageUpload = ({ file, canvas, shapeRef }) => {
  const reader = new FileReader();

  reader.onload = () => {
    fabric.Image.fromURL(reader.result, (img) => {
      img.scaleToWidth(350);
      img.scaleToHeight(350);

      const clipPath = new fabric.Rect({
        width: img.width,
        height: img.height,
        rx: 60,
        ry: 60,
        originX: "center",
        originY: "center",
      });

      img.clipPath = clipPath;

      canvas.current.add(img);

      img.objectId = uuidv4();

      shapeRef.current = img;

      canvas.current.renderAll();
    });
  };

  reader.readAsDataURL(file);
};

export const handleAiImageUpload = async ({ src, canvas, shapeRef }) => {
  // console.log(`src: ${src}, canvas: ${canvas}, shapeRef: ${shapeRef}`);

  if (!src) {
    alert("provide src...");
    return;
  }

  try {
    fabric.Image.fromURL(src, (img) => {
    img.scaleToWidth(350);
    img.scaleToHeight(350);

    const clipPath = new fabric.Rect({
      width: img.width,
      height: img.height,
      rx: 60,
      ry: 60,
      originX: "center",
      originY: "center",
    });

    img.clipPath = clipPath;

    canvas.current.add(img);

    img.objectId = uuidv4();

    shapeRef.current = img;

    canvas.current.renderAll();
    });
    successNotify("Generated ai-image!");
  } catch (error) {
    errorNotify("Can't generated properly!")
  }
};

export const bgRemove = async ({ fabricRef, shapeRef, setLoader }) => {
  const selectedImage = fabricRef.current.getActiveObject();
  // console.log(`selectedImage type: ${selectedImage._element.src}`);

  if (!selectedImage || selectedImage.type !== "image") {
    errorNotify("No image selected on canvas.");
    return;
  }

  setLoader(true);

  const apiKey = import.meta.env.VITE_REACT_APP_BG_REMOVE_KEY;
  const url = "https://api.remove.bg/v1.0/removebg";
  const formData = new FormData();
  const blob = await fetch(selectedImage._element.src).then((res) => res.blob());
  formData.append("image_file", blob);
  formData.append("size", "auto");

  try {
    const res = await axios.post(url, formData, {
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob",
    });
    const imageURL = URL.createObjectURL(res.data);
    // console.log(`imageURL: ${imageURL}`);
    fabric.Image.fromURL(imageURL, (img) => {
      img.scaleToWidth(350);
      img.scaleToHeight(350);

      const clipPath = new fabric.Rect({
        width: img.width,
        height: img.height,
        rx: 60,
        ry: 60,
        originX: "center",
        originY: "center",
      });

      img.clipPath = clipPath;

      fabricRef.current.add(img);

      img.objectId = uuidv4();

      shapeRef.current = img;

      fabricRef.current.renderAll();
    });
    successNotify("Removed!");
  } catch (error) {
    setLoader(false);
    errorNotify("Already removed or can't remove for your image!");
    console.error(error);
  } finally {
    setLoader(false);
  }

};

export const modifyShape = ({ canvas, property, value }) => {
  const selectedElement = canvas.getActiveObject();
  // console.log(selectedElement)

  if (!selectedElement || selectedElement?.type === "activeSelection") return;

  // if  property is width or height, set the scale of the selected element
  if (property === "width") {
    selectedElement.set("scaleX", 1);
    selectedElement.set("width", value);
  } else if (property === "height") {
    selectedElement.set("scaleY", 1);
    selectedElement.set("height", value);
  } else {
    if (selectedElement[property] === value) return;
    selectedElement.set(property, value);
  }

  canvas.renderAll();
};
