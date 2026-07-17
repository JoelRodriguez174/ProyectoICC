const submitMail = async (data) => {
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            access_key: accessKey,
            ...data,
            subject: `Nuevo mensaje de contacto: ${data.name}`,
            from_name: "Web Iglesia Casa del Alfarero",
        }),
    });

    const result = await response.json();
    if (!result.success) {
        throw new Error(result.message || "Error al enviar el formulario");
    }
    return result;
};

export default submitMail;