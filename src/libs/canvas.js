import { fabric } from "fabric";
import { createSpecificShape } from "./shapes";
import { defaultImageElement } from "../constants/constant";
import html2canvas from 'html2canvas';

export const initializeFabric = ({ fabricRef, canvasRef }) => {

  const canvasElement = document.getElementById("canvas");

  const canvas = new fabric.Canvas(canvasRef.current, {
    width: canvasElement?.clientWidth,
    height: canvasElement?.clientHeight,
  });

  fabricRef.current = canvas;

  return canvas;
};

export const initializeBackFabric = ({ backFabricRef, backCanvasRef }) => {

  const canvasElement = document.getElementById("back-canvas");

  const canvas = new fabric.Canvas(backCanvasRef.current, {
    width: canvasElement?.clientWidth,
    height: canvasElement?.clientHeight,
  });

  backFabricRef.current = canvas;

  return canvas;
};

export const handleCanvasMouseDown = ({
  options,
  canvas,
  shapeRef,
  selectedShapeRef,
}) => {
  // get pointer coordinates
  const pointer = canvas.getPointer(options.e);

  const target = canvas.findTarget(options.e, false);

  if (
    target &&
    (target.type === selectedShapeRef.current ||
      target.type === "activeSelection")
  ) {

    // set active object to target
    canvas.setActiveObject(target);

    /**
     * setCoords() is used to update the controls of the object
     * setCoords: http://fabricjs.com/docs/fabric.Object.html#setCoords
     */
    target.setCoords();
  } else {

    // create custom fabric object/shape and set it to shapeRef
    shapeRef.current = createSpecificShape(
      selectedShapeRef.current,
      pointer
    );

    // if shapeRef is not null, add it to canvas
    if (shapeRef.current) {
      // add: http://fabricjs.com/docs/fabric.Canvas.html#add
      canvas.add(shapeRef.current);
    }
  }
};

export const handleCanvaseMouseMove = ({
  options,
  canvas,
  selectedShapeRef,
  shapeRef,
}) => {

  if (selectedShapeRef.current === "freeform") return;
  // get pointer coordinates
  const pointer = canvas.getPointer(options.e);

  // depending on the selected shape, set the dimensions of the shape stored in shapeRef in previous step of handelCanvasMouseDown
  // calculate shape dimensions based on pointer coordinates
  switch (selectedShapeRef.current) {
    case "image":
      shapeRef.current.set({
        width: pointer.x - (shapeRef.current?.left || 0),
        height: pointer.y - (shapeRef.current?.top || 0),
      });
      break;

    default:
      break;
  }

  // render objects on canvas
  // renderAll: http://fabricjs.com/docs/fabric.Canvas.html#renderAll
  canvas.renderAll();
};

export const handleCanvasMouseUp = ({
  canvas,
  shapeRef,
  selectedShapeRef,
  setActiveElement,
}) => {
  if (selectedShapeRef.current === "freeform") return

  if (selectedShapeRef.current === "reset") {
    canvas.clear();
  }

  // set everything to null
  shapeRef.current = null;
  selectedShapeRef.current = null;


  // if canvas is not in drawing mode, set active element to default nav element after 700ms
  setTimeout(() => {
    setActiveElement(defaultImageElement);
  }, 700);
};

export const handleCanvasSelectionCreated = ({
  options,
  isEditingRef,
  setElementAttributes,
}) => {
  // if user is editing manually, return
  if (isEditingRef.current) return;

  // if no element is selected, return
  if (!options.selected) return;

  // get the selected element
  const selectedElement = options.selected[0];
  // console.log(selectedElement);

  // if only one element is selected, set element attributes
  if (selectedElement && options.selected.length === 1) {

    const scaledWidth = selectedElement.scaleX
      ? selectedElement.width * selectedElement?.scaleX
      : selectedElement.width;

    const scaledHeight = selectedElement.scaleY
      ? selectedElement.height * selectedElement.scaleY
      : selectedElement.height;

    setElementAttributes({
      width: scaledWidth.toFixed(0).toString() || "",
      height: scaledHeight.toFixed(0).toString() || "",

      fill: selectedElement.fill?.toString() || "",

      stroke: selectedElement.stroke || "",

      fontSize: selectedElement.fontSize || "",

      fontFamily: selectedElement.fontFamily || "",

      fontWeight: selectedElement.fontWeight || "",
    });
  }
};

export const handleResize = ({ canvas }) => {
  const canvasElement = document.getElementById("canvas");
  if (!canvasElement) return;

  if (!canvas) return;

  canvas.setDimensions({
    width: canvasElement.clientWidth,
    height: canvasElement.clientHeight,
  });
};

export const captureFrontView = async (setCapturedFrontView) => {
  try {
    // Capture front view
    const frontDiv = document.getElementById('front-capture');
    const capturedFrontContent = await html2canvas(frontDiv);
    const existingCapturedFrontView = localStorage.getItem('capturedFrontView');
    if (existingCapturedFrontView) {
      localStorage.removeItem('capturedFrontView');
    }
    const imageDataURL = capturedFrontContent.toDataURL('image/png');
    localStorage.setItem('capturedFrontView', imageDataURL);
    setCapturedFrontView(imageDataURL); // Update the finalFrontView state in BuyBtn
  } catch (error) {
    console.error('Error capturing views:', error);
  }
};


export const captureBackView = async (setCapturedBackView) => {
  try {
    // Capture front view
    const backDiv = document.getElementById('back-capture');
    const capturedBackContent = await html2canvas(backDiv);
    const existingCapturedBackView = localStorage.getItem("capturedBackView");
    if (existingCapturedBackView) {
      localStorage.removeItem('capturedBackView');
    };
    const imageDataURL = capturedBackContent.toDataURL('image/png');
    localStorage.setItem('capturedBackView', imageDataURL);
    await setCapturedBackView(imageDataURL);
  } catch (error) {
    console.error('Error capturing views:', error);
  };
};




