import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import { UploadWidgetProps, UploadWidgetValue } from "@/types";
import { Loader2, UploadCloud, X } from "lucide-react";
import { useEffect, useRef, useState } from "react"

const UploadWidget = ({ value = null, onChange, disabled = false }: UploadWidgetProps) => {
    const widgetRef = useRef<CloudinaryWidget | null>(null);
    const onChangeRef = useRef(onChange)
    const [preview, setPreview] = useState<UploadWidgetValue | null>(value);
    const [deleteToken, setDeleteToken] = useState<string | null>(null);
    const [isRemoving, setIsRemoving] = useState(false)



    useEffect(() => {
        setPreview(value)
        if (!value) setDeleteToken(null)
    }, [value])

    useEffect(() => {
        onChangeRef.current = onChange;
    }, [onChange])

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const initializeWidget = () => {
            if (!window.cloudinary || widgetRef.current) return false;
            widgetRef.current = window.cloudinary.createUploadWidget({
                cloudName: CLOUDINARY_CLOUD_NAME,
                uploadPreset: CLOUDINARY_UPLOAD_PRESET,
                multiple: false,
                maxFileSize: 5000000,
                clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
                return_delete_token: true
            }, (error, result) => {
                if (!error && result.event === 'success') {
                    const payload: UploadWidgetValue = {
                        url: result.info.secure_url,
                        publicId: result.info.public_id,
                    }
                    setPreview(payload)
                    if (result.info.delete_token) {
                        setDeleteToken(result.info.delete_token);
                    }
                    onChangeRef.current?.(payload)
                }
            })
            return true;
        }

        if (initializeWidget()) return;
        const intervalId = window.setInterval(() => {
            if (initializeWidget()) {
                window.clearInterval(intervalId)
            }
        }, 500)

        return () => window.clearInterval(intervalId);

    }, [onChange])



    const openWidget = () => {
        if (!disabled) widgetRef.current?.open();
    }

    const removeFromCloudinary = async () => {
        if (!deleteToken) return
        setIsRemoving(true)
        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/delete_by_token`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: deleteToken })
            })

            if (response.ok) {
                setPreview(null);
                setDeleteToken(null);
                onChangeRef.current?.(null)
            } else {
                const errData = await response.json();
                console.error("Cloudinary deletion failed:", errData);
            }

        } catch (error) {
            console.error("Failed to remove image", error)
        } finally {
            setIsRemoving(false)
        }
    }
    return (
        <div className="space-y-2">
            {preview ? (
                <div className="upload-preview">
                    <img src={preview.url} alt="Uploaded file" />
                    <button
                        type="button"
                        onClick={removeFromCloudinary}
                        disabled={isRemoving}
                        className="absolute top-2 right-2 p-1 bg-red-400 hover:bg-red-700 text-white rounded-full transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {isRemoving ? (<Loader2 className="animate-spin" />) : (<X className="w-4 h-4" />)}
                    </button>
                </div>
            ) : <div className="upload-dropzone" role="button" tabIndex={0}
                onClick={openWidget}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        openWidget();
                    }
                }}>
                <div className="upload-prompt"><UploadCloud className="icon" />
                    <div>
                        <p>Click to upload photo</p>
                        <p>PNG,JPG up to 5MB</p>
                    </div>
                </div>
            </div>
            }

        </div>
    )
}

export default UploadWidget