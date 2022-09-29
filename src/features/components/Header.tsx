// import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { ArrowBack } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface HeaderProps {
  back?: boolean;
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ back, children }) => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <Box
      sx={{
        marginTop: 4,
        marginBottom: 4,
        // paddingLeft: 2,
        // paddingRight: 2,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      {back && <ArrowBack sx={{ cursor: "pointer" }} onClick={goBack} />}
      {back && <Typography variant="h6">{children}</Typography>}
      {!back && <Typography variant="h4">{children}</Typography>}
    </Box>
  );
};

export default Header;
