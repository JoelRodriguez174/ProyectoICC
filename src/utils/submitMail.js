import { useState } from "react";

const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

const onSubmit = async (data) => {
    setSubmitStatus(null);
    try {
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
        if (result.success) {
            setSubmitStatus('success');
            reset();
        } else {
            setSubmitStatus('error');
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitStatus('error');
    }
};

export default onSubmit;