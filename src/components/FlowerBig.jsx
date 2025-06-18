import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { httpGetOneFlower,httpGetOneStaticFlower } from '../api/flowerService'
import "../style/try.css";

const FlowerBig = () => {
    let navigate = useNavigate();
    let params = useParams();
    let [flower, setFlower] = useState();

    useEffect(() => {
        console.log("hvybnjk")
        httpGetOneFlower(params.id).then(res => {
            setFlower(res.data);
            console.log(res.data);
        }).catch(er => {
            console.log("error with getting flower by id: " + er);
        })
    }, [params.id])

    return (
        <>
            <div className="lo">
                <div className="inner">
                    {!flower ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <input type="button" value="x" className="close-button" onClick={() => navigate(-1)} />
                            <div className="flower-wrapper">
                                <div className="flower-image">
                                    <img src={httpGetOneStaticFlower(flower.img)} alt={flower.name} width={250} />
                                </div>
                                <div className="flower-info">
                                    <h3 className="flower-name">{flower.name}</h3>
                                    <p className="flower-description"><strong>Description:</strong> {flower.description}</p>
                                    <p className="flower-price"><strong>Price:</strong> ${flower.price}</p>
                                    <div className="flower-ingredients">
                                        <strong>Contains:</strong>
                                        <div className="ingredients-list">
                                            {flower.flowerContain?.map((ingredient, index) => (
                                                <div key={index} className="ingredient-item">{ingredient}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default FlowerBig;
