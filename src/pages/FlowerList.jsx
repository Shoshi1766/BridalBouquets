import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { httpGetAllFlowers, httpGetCountFlowerInPage } from "../api/flowerService";
import Flower from "../components/Flower"
import '../style/FlowerList.css';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const FlowerList = () => {
    const [arrFlowers, setArrFlowers] = useState([]);
    const [cntPages, setCntPages] = useState(1);  // התחל עם 1
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);  // מספר פרחים לדף
    let currentUser = useSelector(state => state.user.currentUser);

    // פוקנציה שמביאה את כל הפרחים בדף מסויים
    const bringFromServer = (page) => {
        httpGetAllFlowers(page, limit)
            .then(res => {
                setArrFlowers(res.data);
            })
            .catch((error) => {
                console.error("Error fetching flowers:", error); // אם יש שגיאה בבקשה
            });
    };

    // פוקנציה שמביאה את מספר הדפים
    useEffect(() => {
        httpGetCountFlowerInPage(limit)
            .then(res => {
                setCntPages(res.data.countOfPages);  // מספר הדפים
                setLimit(res.data.limit); // עדכון ה-limit מהשרת
            })
            .catch((error) => {
                console.error("Error fetching total pages:", error); // אם יש שגיאה בבקשה
            });
    }, [limit, arrFlowers]);

    // מביאה את הנתונים בכל פעם שמשתנה הדף
    useEffect(() => {
        bringFromServer(currentPage);
    }, [currentPage, limit]);

    // יוצרת כפתורים לכל דף
    let buttons = [];
    if (cntPages) {
        for (let i = 1; i <= cntPages; i++) {
            buttons.push(
                <button key={i} onClick={() => setCurrentPage(i)}>
                    {i}
                </button>
            );
        }
    }

    function deleteFlowerFromArr(id) {
        let newArrFlowers = arrFlowers.filter(flower => flower._id != id)
        setArrFlowers(newArrFlowers);
    }

    return (
        <div className="flowers" style={{ marginLeft: 200 }}>
            <Outlet />
            {/* הצגת הפרחים */}
            {arrFlowers.length > 0 ? (
                arrFlowers.map((flower, index) => (
                    <div key={index}>
                        <Flower flower={flower} deleteFlowerFromArr={deleteFlowerFromArr} className="flower" />
                    </div>
                ))
            ) : (
                <p>No flowers available</p>
            )}
            <Stack style={{ zIndex: 999 }}
                spacing={2}
                direction="row"
                justifyContent="center"
                sx={{
                    position: "fixed",    // להקפיא את ה-pagination
                    bottom: 20,           // למקם את הכפתורים במרחק 20px מתחתית הדף
                    left: "50%",          // למרכז את הכפתורים
                    transform: "translateX(-50%)", // למרכז את הכפתורים במדויק
                    zIndex: 1000,         // להבטיח שהכפתורים יהיו תמיד מעל התוכן
                    marginTop: "20px",
                }}
            >
                <Pagination
                    count={cntPages}
                    page={currentPage}
                    onChange={(event, value) => setCurrentPage(value)}
                    color="primary"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            backgroundColor: '#8B1A3E', // צבע ורוד כהה
                            color: 'white',
                            border: '1px solid #8B1A3E',
                            borderRadius: '5px',
                            padding: '8px 16px',
                            transition: 'all 0.3s ease',
                        },
                        '& .MuiPaginationItem-root:hover': {
                            backgroundColor: '#9B1D4E', // גוון ורוד כהה יותר בעת ריחוף
                            borderColor: '#9B1D4E',
                        },
                        '& .MuiPaginationItem-root.Mui-selected': {
                            backgroundColor: '#C25D7E', // צבע כפתור נבחר
                            borderColor: '#C25D7E',
                        },
                        '& .MuiPaginationItem-root:focus': {
                            outline: 'none',
                            boxShadow: '0 0 0 2px rgba(139, 26, 62, 0.5)', // צללה סביב הכפתור כאשר הוא במיקוד
                        }
                    }}
                />
            </Stack>
        </div>
    );

};

export default FlowerList;

