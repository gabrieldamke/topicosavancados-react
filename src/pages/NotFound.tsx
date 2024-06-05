import { Box, Typography, Button } from "@mui/material";

export default function NotFound() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.default",
        padding: 3,
        paddingBottom: `10%`,
      }}
    >
      <img
        src="/notfound.png"
        alt="Página Não Encontrada"
        style={{ maxWidth: "100%", maxHeight: "300px" }}
      />
      <Typography variant="h4" sx={{ color: "text.primary" }}>
        Página Não Encontrada
      </Typography>
      <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
        Ooops! Não conseguimos encontrar a página que você está procurando.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={() => window.history.back()}
      >
        Voltar
      </Button>
    </Box>
  );
}
