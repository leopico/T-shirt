import { Box, Modal, Slider, Button } from "@mui/material";
import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import axios from "axios";

const boxStyle = {
    width: "490px",
    height: "490px",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center"
};
const modalStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

const CropperAiModal = ({ src, modalOpen, setModalOpen, setFrontAiImage }) => {
    const [slideValue, setSlideValue] = useState(10);
    const [rotate, setRotate] = useState(0);
    const cropRef = useRef(null);
    console.log(`url-img: ${src}`);

    const handleSave = async () => {
        if (cropRef) {
            const dataUrl = cropRef.current.getImage().toDataURL();
            // console.log(`dataurl: ${dataUrl}`);
            const result = await fetch(dataUrl);
            const blob = await result.blob();
            const aiImage = URL.createObjectURL(blob);
            // console.log(`ai-image: ${aiImage}`);
            setFrontAiImage((prevFrontAIImage) => ({
                ...prevFrontAIImage,
                image: {
                    withBackground: aiImage,
                },
            }));
            setModalOpen(false);
        } 
    };
   
    return (
        <Modal sx={modalStyle} open={modalOpen}>
            <Box sx={boxStyle}>
                <AvatarEditor
                    ref={cropRef}
                    image={src}
                    style={{ width: "100%", height: "100%" }}
                    border={50}
                    borderRadius={10}
                    color={[0, 0, 0, 0.72]}
                    scale={slideValue / 10}
                    rotate={rotate}
                    crossOrigin="anonymous"
                />

                {/* MUI Slider */}
                <Slider
                    min={10}
                    max={50}
                    sx={{
                        margin: "0 auto",
                        width: "80%",
                        color: "cyan"
                    }}
                    size="medium"
                    defaultValue={slideValue}
                    value={slideValue}
                    onChange={(e) => setSlideValue(e.target.value)}
                />
                <Slider
                    min={0}
                    max={24}
                    step={1}
                    sx={{
                        margin: "0 auto",
                        width: "80%",
                        color: "cyan"
                    }}
                    size="medium"
                    defaultValue={rotate / 15}
                    value={rotate / 15}
                    onChange={(e, value) => setRotate(value * 15)}
                />
                <Box
                    sx={{
                        display: "flex",
                        padding: "10px",
                        border: "3px solid white",
                        background: "black"
                    }}
                >
                    <Button
                        size="small"
                        sx={{ marginRight: "10px", color: "white", borderColor: "white" }}
                        variant="outlined"
                        onClick={(e) => setModalOpen(false)}
                    >
                        cancel
                    </Button>
                    <Button
                        sx={{ background: "cyan", color: "black" }}
                        size="small"
                        variant="contained"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CropperAiModal