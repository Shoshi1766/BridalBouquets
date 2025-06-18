import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { httpAddFlower, httpGetOneFlower, httpUpdateFlower,httpGetOneStaticFlower } from "../api/flowerService";
import { TextField, Button, Box, Typography, Input, IconButton } from "@mui/material";
import { Delete } from '@mui/icons-material';

const AddNewItem = () => {
    const { register, handleSubmit, formState: { errors, isSubmitted }, control, setValue, watch, reset } = useForm({ defaultValues: { flowerContain: [] } });
    const { fields, append, remove } = useFieldArray({ control, name: "flowerContain" });
    let navigate = useNavigate();
    let { id } = useParams();
    const [imageSrc, setImageSrc] = useState(""); // שמירת הכתובת של התמונה
    const [imageUrl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const flowerContain = watch("flowerContain");

    // אם יש id, אז אנחנו בעריכת מוצר
    const isEditMode = Boolean(id);

    // מנקה את הטופס כאשר לוחצים על כפתור הוספת מוצר (אם אנחנו במצב עריכה)
    useEffect(() => {
        if (!isEditMode) {
            reset({ flowerContain: [] });  // מנקה את הנתונים מהטופס
            setImageSrc("");  // מנקה את התמונה
        }
    }, [isEditMode, reset]);

    useEffect(() => {
        if (isEditMode) {
            httpGetOneFlower(id).then(res => {
                setValue("name", res.data.name);
                setValue("description", res.data.description);
                setValue("price", res.data.price);
                setValue("flowerContain", res.data.flowerContain || []); // אם יש "flowerContain", נמלא אותו
                setImageSrc(res.data.img || ""); // אם יש תמונה, נטען אותה
            }).catch(er => {
                console.log("Error with getting flower by id: " + er);
            });
        }
    }, [id, isEditMode, setValue]);


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setImageFile(file);
        setImageSrc(""); // מנקה את הכתובת הישנה כי העלנו קובץ חדש
    };

    const save = (data) => {
        if (flowerContain.length === 0) {
            return; // לא נמשיך לשלוח את הבקשה עד שנוסיף פרחים
        }
        let name = data.name.trim();
        if (!name.toLowerCase().includes("bouquet")) {
            name += " Bouquet";
        }

        const updatedData = {
            ...data,
            price: Number(data.price), // המרה למספר
            img: imageSrc, // שמירת הכתובת של התמונה בלבד
            name: name,
        };

        if (isEditMode) { // אם יש id, אנחנו בעדכון פרח קיים
            httpUpdateFlower(id, updatedData).then(
                res => {
                    alert("Flower updated successfully.");
                    navigate("/home");
                }
            ).catch(err => {
                alert("Error with updating flower.");
                console.log("Error with updating flower: " + err.response.data.message);
            });
        } else {
            httpAddFlower(updatedData).then(
                res => {
                    alert("Flower added successfully.");
                    navigate("/home");
                }
            ).catch(err => {
                alert("Error with adding new flower.");
                console.log("Error with adding new flower: " + err.response.data.message);
            });
        }
    };

    return (
        <Box style={{ marginLeft: 240 }} sx={{ maxWidth: 600, margin: "auto", padding: 2, boxShadow: 3, borderRadius: 2, backgroundColor: "#fff" }}>
            <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 2, color: "#880e4f" }}>
                {isEditMode ? "Edit Flower" : "Add New Flower"}
            </Typography>
            <form noValidate onSubmit={handleSubmit(save)}>
                <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    sx={{ marginBottom: 2 }}
                    {...register("name", { required: "Name is required." })}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    InputLabelProps={{
                        shrink: true, // שומר את הלייבל למעלה
                    }}
                />

                <TextField
                    fullWidth
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    sx={{ marginBottom: 2 }}
                    {...register("description")}
                    InputLabelProps={{
                        shrink: true, // שומר את הלייבל למעלה
                    }}
                />

                <TextField
                    fullWidth
                    label="Price"
                    variant="outlined"
                    type="number"
                    sx={{ marginBottom: 2 }}
                    {...register("price", { required: "Price is required." })}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    InputLabelProps={{
                        shrink: true, // שומר את הלייבל למעלה
                    }}
                />

                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Flower Contain
                </Typography>
                {fields.map((item, index) => (
                    <Box key={item.id} sx={{ marginBottom: 1, display: 'flex', alignItems: 'center' }}>
                        <TextField
                            fullWidth
                            label={`Flower ${index + 1}`}
                            variant="outlined"
                            {...register(`flowerContain[${index}]`, { required: "Flower contain is required." })}
                            error={!!errors.flowerContain?.[index]}
                            helperText={errors.flowerContain?.[index]?.message}
                            InputLabelProps={{
                                shrink: true, // שומר את הלייבל למעלה
                            }}
                        />
                        <IconButton
                            onClick={() => remove(index)}
                            sx={{ marginLeft: 1, color: "#d32f2f" }}>
                            <Delete />
                        </IconButton>
                    </Box>
                ))}

                {/* הוספת Flower */}
                <Button
                    variant="outlined"
                    onClick={() => append("")}
                    sx={{ marginBottom: 2, width: "100%" }}
                >
                    Add Flower
                </Button>

                {/* הצגת שגיאה אם אין פרחים ברגע שנשלח הטופס */}
                {isSubmitted && flowerContain.length === 0 && (
                    <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
                        At least one flower must be added to the contain.
                    </Typography>
                )}

                {/* העלאת תמונה */}
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Upload Image
                </Typography>
                <label htmlFor="upload-image" style={{ cursor: "pointer", textDecoration: 'underline', color: 'blue' }}>
                    {imageFile ? imageFile.name : isEditMode ? imageSrc : "לא נבחר קובץ"}
                </label>
                <Input
                    id="upload-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    sx={{ marginBottom: 2 }}
                    style={{ display: 'none' }}
                />
                {(imageFile || imageSrc) && (
                    <Box sx={{ marginBottom: 2 }}>
                        {imageFile ? (
                            <img
                                src={URL.createObjectURL(imageFile)}
                                alt="Uploaded preview"
                                style={{ width: "100px", height: "auto", objectFit: "contain" }}
                            />
                        ) : (
                            <img
                                src={httpGetOneStaticFlower(imageSrc)}
                                alt="Existing flower"
                                style={{ width: "100px", height: "auto", objectFit: "contain" }}
                            />
                        )}
                    </Box>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ width: "100%" }}
                >
                    {isEditMode ? "Update Flower" : "Add Flower"}
                </Button>
            </form>
        </Box>
    );
};

export default AddNewItem;
