import React, { useState } from "react";
import "./PvVide.css";
import logo from "./assets/logo.png";

<<<<<<< HEAD
const Print = ({ sendData }) => {
=======
const Print = ({ formData }) => {
>>>>>>> 37407c538f03ed39afc51cc9bdb3628970889c0a
  

    const [formData, setFormData] = useState({
        number: "",
        day: "",
        hour: "",
        place: "",
        sell: "",
        observation: "",
        fullname: "",
        Dbirth: "",
        placeOfBirth: "",
        Fname: "",
        Mname: "",
        idCard: "",
        idExpiry: "",
        nationality: "",
        address: "",
        role: "",
        confession: "",
        info: "",
        DATEof: "",
        HOURof: "",
        HISname: "",
        copy: ""
    });


    const handlePrint = () => {
        window.print();
    };

    // Function to handle changes in inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        sendData((prevDataS) => ({
            ...prevDataS,
            [name]: value,
        }));
    };

    return (
        <>
            <div id="print-area" className="print-container">
                {/* Header */}
                <div className="header">
                    <div className="logo-container text-center">
                        <img src={logo} alt="Logo" className="logo" />
                    </div>
                    <div className="text-center">
                        <p className="font-bold">مندوبية الصناعة والتجارة بوجدة</p>
                        <p className="text-base">Délégation de l'industrie et du Commerce d'Oujda</p>
                    </div>
                </div>

                {/* Title */}
                <div className="title">
                    <h3>مراقبة تطبيق القانون رقم 31.08 القاضي بتحديد تدابير لحماية المستهلك ونصوصه التطبيقية</h3>
                </div>

                {/* Content */}
                <div className="table-section">
                    <table>
                        <tbody className="styled-table">
                            <tr>
                                <td className="left-column">
                                    مندوبية وزارة التجارة و الصناعة بوجدة <br />
                                    العنوان: 28، شارع الجيش الملكي، ص.ب: 729
                                    <br /> وجدة، المغرب <br />
                                    + الهاتف: 01 42 86 36 5 212 <br />
                                    + الفاكس: 38 02 68 36 5 212
                                </td>
                                <td className="right-column">
                                    <p className="font-bold text-center">
                                        محضر إثبات المخالفات <br />
                                        حرر طبقا للمادة 169 من القانون رقم 31.08 <br />
                                        القاضي بتحديد تدابير لحماية المستهلك
                                    </p>
                                    <p className="text-center">
                                        <input type="text" name="number" value={formData.number} onChange={handleInputChange} /> رقم
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="inspection-details">
                    <p>في يوم <input type="date" name="day" value={formData.day} onChange={handleInputChange} /> على الساعة <input type="text" name="hour" value={formData.hour} onChange={handleInputChange} /></p>
                    <p>إلى المحل التجاري الكائن مقره <input type="text" name="place" value={formData.place} onChange={handleInputChange} /></p>
                    <p>والذي يستغل في بيع <input type="text" name="sell" value={formData.sell} onChange={handleInputChange} /></p>
                </div>

                <div className="observation-section">
                    <p>وبعد أن عرضنا على الشخص الماثل أمامنا صفتنا وبطاقاتنا المهنية وأبلغناه بطبيعة مهمتنا وأسسها القانونية، عاينا ما يلي:</p>
                    <textarea name="observation" value={formData.observation} onChange={handleInputChange}></textarea>
                </div>

                <div className="declaration-section">
                    <p>وقد أدلى لنا الشخص الماثل أمامنا بما يلي:</p>
                    <p>الاسم الشخصي والعائلي: <input type="text" name="fullname" value={formData.fullname} onChange={handleInputChange} /></p>
                    <p>المزداد(ة) بتاريخ <input type="date" name="Dbirth" value={formData.Dbirth} onChange={handleInputChange} /> ب <input type="text" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleInputChange} /></p>
                    <p>اسم الأب: <input type="text" name="Fname" value={formData.Fname} onChange={handleInputChange} /></p>
                    <p>اسم الأم: <input type="text" name="Mname" value={formData.Mname} onChange={handleInputChange} /></p>
                    <p>الحامل(ة) لبطاقة التعريف الوطنية رقم <input type="text" name="idCard" value={formData.idCard} onChange={handleInputChange} /> الصالحة الى غاية <input type="text" name="idExpiry" value={formData.idExpiry} onChange={handleInputChange} /></p>
                    <p>الجنسية: <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} /> الساكن(ة) ب <input type="text" name="address" value={formData.address} onChange={handleInputChange} /></p>
                    <p>بصفته(ها): <input type="text" name="role" value={formData.role} onChange={handleInputChange} /></p>
                </div>

                <div className="observation-section">
                    <p>وأثناء الاستماع إليه(ها)، صرح(ت) لنا بما يلي:</p>
                    <textarea name="confession" value={formData.confession} onChange={handleInputChange}></textarea>
                </div>

                <div className="additional-info">
                    <p>معلومات إضافية:</p>
                    <textarea name="info" value={formData.info} onChange={handleInputChange}></textarea>
                </div>

                <div className="closing-section">
                    <p>أقفل المحضر بتاريخ <input type="date" name="DATEof" value={formData.DATEof} onChange={handleInputChange} /> على الساعة <input type="text" name="HOURof" value={formData.HOURof} onChange={handleInputChange} /></p>
                    <p>حيث حرر في ثلاث نسخ وسلمت نسخة منه للسيد(ة) <input type="text" name="HISname" value={formData.HISname} onChange={handleInputChange} />.</p>
                    <p>تم إرسال النسخة الأصلية لهذا المحضر إلى السيد وكيل الملك بالمحكمة الابتدائية <input type="text" name="copy" value={formData.copy} onChange={handleInputChange} /></p>
                </div>

                {/* Signature Section */}
                <div className="signature-section">
                    <p className="signature-line">توقيع محرر المحضر</p>
                    <p className="refusal-note">توقيع المصرح (في حالة رفضه، تتم الإشارة إلى ذلك من طرف الباحث)</p>
                </div>

                <button onClick={handlePrint} className="print-button">
                    Imprimer
                </button>
            </div>
        </>
    );
};

export default Print;