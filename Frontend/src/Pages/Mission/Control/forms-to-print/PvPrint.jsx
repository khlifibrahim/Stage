import React, { useState, useEffect } from "react";
import "./pvcss.css";
import logo from '../../../../assets/logo.png';
import { printElement } from "../../../../utils/printUtils";

const PvPrint = ({ sendData, ...rest }) => {
    const [formData, setFormData] = useState({});
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        const now = new Date();
        const todayPV = now.toISOString().split("T")[0];
        const timePV = now.toTimeString().slice(0, 5);
        const observs = rest.pratics?.map(p => ({
            name: p.name,
            obs: p.observation
        })) || [];
        
        setFormData(prev => ({
            ...prev,
            day: todayPV,
            hour: timePV,
            place: rest.addsg || '',
            observation: observs,
            DATEof: todayPV,
            HOURof: timePV
        }));
    }, [rest.pratics, rest.addsg]);

    const handlePrint = () => {
        // Use the new printing utility
        printElement('print-area-pv', 'محضر إثبات المخالفات');
    };

    const handleConfirm = (e) => {
        e.preventDefault();
        if (Object.entries(formData).length === 0) {
            setIsConfirmed(false);
            return false;
        }
        setIsConfirmed(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        sendData(formData);
    };

    return (
        <>
            <div id="print-area-pv" className="print-container">
                {/* Header */}
                <div className="header">
                    <div className="logo-container text-center">
                        <img src={logo} alt="Logo" className="logo" />
                    </div>
                    <div className="text-center">
                        <p className="font-bold">مندوبية الصناعة والتجارة بوجدة</p>
                        <p className="text-base">Délégation de l'industrie et du Commerce d'Oujda</p>
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
                                        محضر إثبات المخالفات <br />
                                        حرر طبقا للمادة 169 من القانون رقم 31.08 <br />
                                        القاضي بتحديد تدابير لحماية المستهلك
                                    </p>
                                    <p className="text-center"> رقم 
                                        <input className="mr-2 px-3 outline-none focus:border focus:border-blue rounded-[10px] " type="text" placeholder="........................" name="number" value={formData.number || ''} onChange={handleInputChange} />
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="inspection-details">
                    <div className="flex gap-2">
                        <p>في يوم <input type="date" name="day" value={formData.day || ''} onChange={handleInputChange} /> على الساعة <input type="time" name="hour" value={formData.hour || ''} onChange={handleInputChange} /></p>
                    </div>
                    <p>إلى المحل التجاري الكائن مقره <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px] w-[50%]" placeholder="........................" type="text" name="place" value={formData.place || ''} onChange={handleInputChange} /></p>
                    <p>والذي يستغل في بيع <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px]" placeholder="........................" type="text" name="sell" value={formData.sell || ''} onChange={handleInputChange} /></p>
                </div>

                <div className="observation-section">
                    <p>وبعد أن عرضنا على الشخص الماثل أمامنا صفتنا وبطاقاتنا المهنية وأبلغناه بطبيعة مهمتنا وأسسها القانونية، عاينا ما يلي:</p>
                    <textarea 
                        className="px-3 outline-none focus:border focus:border-blue rounded-[10px]" 
                        placeholder="........................................................................................................................................................................" 
                        name="observation" 
                        value={formData.observation?.map(o => `${o.name}: ${o.obs}`).join('\n') || ''} 
                        onChange={handleInputChange} 
                    />
                </div>

                <div className="declaration-section">
                    <p>وقد أدلى لنا الشخص الماثل أمامنا بما يلي:</p>
                    <p>الاسم الشخصي والعائلي: <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px]" placeholder="........................" type="text" name="fullname" value={formData.fullname || ''} onChange={handleInputChange} /></p>
                    <p>المزداد(ة) بتاريخ <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px]" placeholder="........................" type="date" name="Dbirth" value={formData.Dbirth || ''} onChange={handleInputChange} /> ب <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px]" placeholder="........................" type="text" name="placeOfBirth" value={formData.placeOfBirth || ''} onChange={handleInputChange} /></p>
                    <p>اسم الأب: <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px]" placeholder="........................" type="text" name="Fname" value={formData.Fname || ''} onChange={handleInputChange} /></p>
                    <p>اسم الأم: <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px]" placeholder="........................" type="text" name="Mname" value={formData.Mname || ''} onChange={handleInputChange} /></p>
                    <p>الحامل(ة) لبطاقة التعريف الوطنية رقم <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px]" placeholder="........................" type="text" name="idCard" value={formData.idCard || ''} onChange={handleInputChange} /> الصالحة الى غاية <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px]" placeholder="........................" type="text" name="idExpiry" value={formData.idExpiry || ''} onChange={handleInputChange} /></p>
                    <p>الجنسية: <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px]" placeholder="........................" type="text" name="nationality" value={formData.nationality || ''} onChange={handleInputChange} /> الساكن(ة) ب <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px]" placeholder="........................" type="text" name="address" value={formData.address || ''} onChange={handleInputChange} /></p>
                    <p>بصفته(ها): <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px]" placeholder="........................" type="text" name="role" value={formData.role || ''} onChange={handleInputChange} /></p>
                </div>

                <div className="observation-section">
                    <p>وأثناء الاستماع إليه(ها)، صرح(ت) لنا بما يلي:</p>
                    <textarea className="px-3 outline-none focus:border focus:border-blue rounded-[10px]" placeholder="........................" name="confession" value={formData.confession || ''} onChange={handleInputChange}></textarea>
                </div>

                <div className="additional-info">
                    <p>معلومات إضافية:</p>
                    <textarea className="px-3 outline-none focus:border focus:border-blue rounded-[10px]" placeholder="........................" name="info" value={formData.info || ''} onChange={handleInputChange}></textarea>
                </div>

                <div className="closing-section">
                    <p>أقفل المحضر بتاريخ <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px]" placeholder="........................" type="date" name="DATEof" value={formData.DATEof || ''} onChange={handleInputChange} /> على الساعة <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px]" placeholder="........................" type="time" name="HOURof" value={formData.HOURof || ''} onChange={handleInputChange} /></p>
                    <p>حيث حرر في ثلاث نسخ وسلمت نسخة منه للسيد(ة) <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px]" placeholder="........................" type="text" name="HISname" value={formData.HISname || ''} onChange={handleInputChange} />.</p>
                    <p>تم إرسال النسخة الأصلية لهذا المحضر إلى السيد وكيل الملك بالمحكمة الابتدائية <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px]" placeholder="........................" type="text" name="copy" value={formData.copy || ''} onChange={handleInputChange} /></p>
                </div>

                {/* Signature Section */}
                <div className="signature-section">
                    <p className="signature-line">توقيع محرر المحضر</p>
                    <p className="refusal-note">توقيع المصرح (في حالة رفضه، تتم الإشارة إلى ذلك من طرف الباحث)</p>
                </div>
            </div>

            <div className="button-group">
                <button onClick={handleConfirm} className="confirm-button">
                    Confirm
                </button>
                <button disabled={!isConfirmed} onClick={handlePrint} className="print-button">
                    Imprimer
                </button>
            </div>
        </>
    );
};

export default PvPrint;