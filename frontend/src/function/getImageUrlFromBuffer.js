import { useState, useEffect } from 'react';

function getImageUrlFromBuffer(photoBuffer) {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const convertBufferToBlob = async () => {
            try {
                const uint8Array = new Uint8Array(photoBuffer);
                const blob = new Blob([uint8Array], { type: 'image/png' });
                const url = URL.createObjectURL(blob);
                setImageSrc(url);
            } catch (error) {
                console.error('Error creating blob from buffer', error);
            }
        };

        if (photoBuffer) {
            convertBufferToBlob();
        }

        // Clean up the URL when component unmounts
        return () => {
            if (imageSrc) {
                URL.revokeObjectURL(imageSrc);
            }
        };
    }, [photoBuffer]);

    return imageSrc;
}

export default getImageUrlFromBuffer;
