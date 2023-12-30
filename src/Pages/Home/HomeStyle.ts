type HomeStyleType = {
    container: React.CSSProperties;
    box: React.CSSProperties;
    content: React.CSSProperties;
    titlecontainer: React.CSSProperties;
    title: React.CSSProperties;
    subtitle: React.CSSProperties;
};
  

export const HomeStyle : HomeStyleType = {
    content: {
        display: "flex", alignItems: "center", flexDirection: "column", gap: 12
    },
    titlecontainer: {
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        flexDirection: "column", 
        gap: 12,
        marginTop: 16,
    },
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 24
        
    },
    title: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        // color: "#333"
    },
    subtitle: {
        fontSize: "1.2rem",
        color: "#666"
    },
    box: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "200px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        height: "100px",
        boxShadow: "0 0 2px #ccc",
        cursor: "pointer",
        padding: "8px",
    }
  };
  