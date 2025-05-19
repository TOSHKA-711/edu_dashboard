"use client";
import React, { useState, useEffect } from "react";
import { IconButton, Box, Tooltip } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FontDownloadIcon from "@mui/icons-material/FontDownload";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";

const fonts = ["Arial", "Times New Roman", "Courier New", "Verdana", "Tahoma"];
const fontWeights = ["300", "400", "700"];
const fontSizes = ["p", "h3", "h2", "h1"];

const TextEditor: React.FC = () => {
  const [fontIndex, setFontIndex] = useState<number>(0);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [fontWeightIndex, setFontWeightIndex] = useState<number>(1);
  const [fontSizeIndex, setFontSizeIndex] = useState<number>(0);
  const [text, setText] = useState<string>("");
  const [htmlText, setHtmlText] = useState<string>("");

  useEffect(() => {
    // تحديث النص مع التنسيقات كـ HTML
    const tag = fontSizes[fontSizeIndex];
    const styledText = `<${tag} style="font-family: ${
      fonts[fontIndex]
    }; font-style: ${isItalic ? "italic" : "normal"}; font-weight: ${
      fontWeights[fontWeightIndex]
    };">${text}</${tag}>`;

    setHtmlText(styledText);
    console.log("Formatted HTML:", htmlText);
  }, [text, fontIndex, isItalic, fontWeightIndex, fontSizeIndex , htmlText]);

  return (
    <Box sx={{ width: "100%", mt: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
        <Tooltip title="تغيير الخط">
          <IconButton
            onClick={() => setFontIndex((prev) => (prev + 1) % fonts.length)}
          >
            <FontDownloadIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Italic">
          <IconButton
            onClick={() => setIsItalic(!isItalic)}
            color={isItalic ? "primary" : "default"}
          >
            <FormatItalicIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="تغيير سمك الخط">
          <IconButton
            onClick={() =>
              setFontWeightIndex((prev) => (prev + 1) % fontWeights.length)
            }
          >
            <FormatBoldIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="عادي">
          <IconButton
            onClick={() => setFontSizeIndex(0)} 
            color={fontSizeIndex === 0 ? "primary" : "default"}
          >
            <LooksOneIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="حجم H1">
          <IconButton
            onClick={() => setFontSizeIndex(1)}
            color={fontSizeIndex === 1 ? "primary" : "default"}
          >
            <LooksTwoIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="حجم H2">
          <IconButton
            onClick={() => setFontSizeIndex(2)}
            color={fontSizeIndex === 2 ? "primary" : "default"}
          >
            <Looks3Icon />
          </IconButton>
        </Tooltip>
        <Tooltip title="حجم H3">
          <IconButton
            onClick={() => setFontSizeIndex(3)}
            color={fontSizeIndex === 3 ? "primary" : "default"}
          >
            <Looks4Icon />
          </IconButton>
        </Tooltip>
      </Box>
      
      <textarea
        name="description"
        cols={30}
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="اكتب هنا..."
        className="w-full outline-none border-b border-[#2664B1] px-5 "
        style={{ width: "100%",
        fontFamily: fonts[fontIndex],
        fontStyle: isItalic ? "italic" : "normal",
        fontWeight: fontWeights[fontWeightIndex],
        fontSize:
          fontSizeIndex === 0
            ? "16px"
            : fontSizeIndex === 1
            ? "32px"
            : fontSizeIndex === 2
            ? "24px"
            : "20px",}}
      ></textarea>

    </Box>
  );
};

export default TextEditor;
