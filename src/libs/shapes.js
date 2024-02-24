import { v4 as uuidv4 } from "uuid";
import { fabric } from "fabric";

export const createText = (pointer, text) => {
  return new fabric.IText(text, {
    left: pointer.x,
    top: pointer.y,
    fill: "#aabbcc",
    fontFamily: "Helvetica",
    fontSize: 36,
    fontWeight: "400",
    objectId: uuidv4()
  });
};

export const createSpecificShape = (
  shapeType,
  pointer
) => {
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

export const handleImageUpload = ({
  file,
  canvas,
  shapeRef,
}) => {
  const reader = new FileReader();

  reader.onload = () => {
    fabric.Image.fromURL(reader.result, (img) => {
      
      img.scaleToWidth(300);
      img.scaleToHeight(300);

      const clipPath = new fabric.Rect({
        width: img.width,
        height: img.height,
        rx: 60,
        ry: 60, 
        originX: 'center',
        originY: 'center',
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

export const handleAiImageUpload = async ({
  src,
  canvas,
  shapeRef,
}) => {
  console.log(`src: ${src}, canvas: ${canvas}, shapeRef: ${shapeRef}`);

  if (!src) {
    alert("provide src...");
    return;
  }

  fabric.Image.fromURL(src, (img) => {
    img.scaleToWidth(300);
    img.scaleToHeight(300);

    const clipPath = new fabric.Rect({
      width: img.width,
      height: img.height,
      rx: 60,
      ry: 60,
      originX: 'center',
      originY: 'center',
    });

    img.clipPath = clipPath;

    canvas.current.add(img);

    img.objectId = uuidv4();

    shapeRef.current = img;

    canvas.current.renderAll();
  });

};

export const modifyShape = ({
  canvas,
  property,
  value,
}) => {
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