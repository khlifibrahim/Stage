import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import "./pvcss.css";
import logo from '../../../assets/logo.png';

const PvPrintable = ({ sendData, ...rest }) => {
    const [formData, setFormData] = React.useState({});
    const [isConfirmed, setIsConfirmed] = React.useState(false);
    const printRef = useRef();

    React.useEffect(() => {
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

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: 'محضر إثبات المخالفات',
        // Optional callback functions
        onBeforeGetContent: () => {
            // You can do any preparation here
            return Promise.resolve();
        },
        onAfterPrint: () => {
            // You can do any cleanup here
            console.log('Printing completed');
        }
    });

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
            <div ref={printRef} className="print-container">
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

                {/* Content - Modified table with centered styling */}
                <div className="table-section">
                    <table style={{ margin: '0 auto', width: '100%' }}>
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
                                        <input className="mr-2 px-3 outline-none focus:border focus:border-blue rounded-[10px] inline-input" type="text" placeholder="........................" name="number" value={formData.number || ''} onChange={handleInputChange} />
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Modified input fields to align inline with text */}
                <div className="inspection-details">
                    <p>في يوم <input type="date" name="day" className="inline-input" value={formData.day || ''} onChange={handleInputChange} /> على الساعة <input type="time" name="hour" className="inline-input" value={formData.hour || ''} onChange={handleInputChange} /></p>
                    <p>إلى المحل التجاري الكائن مقره <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px] inline-input" placeholder="........................" type="text" name="place" value={formData.place || ''} onChange={handleInputChange} /></p>
                    <p>والذي يستغل في بيع <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px] inline-input" placeholder="........................" type="text" name="sell" value={formData.sell || ''} onChange={handleInputChange} /></p>
                </div>

                <div className="observation-section">
                    <p>وبعد أن عرضنا على الشخص الماثل أمامنا صفتنا وبطاقاتنا المهنية وأبلغناه بطبيعة مهمتنا وأسسها القانونية، عاينا ما يلي:</p>
                    <textarea 
                        className="px-3 outline-none focus:border focus:border-blue rounded-[10px] full-width-textarea" 
                        placeholder="........................................................................................................................................................................" 
                        name="observation" 
                        value={formData.observation?.map(o => `${o.name}: ${o.obs}`).join('\n') || ''} 
                        onChange={handleInputChange} 
                    />
                </div>

                {/* Rest of your form sections with inline styling */}
                <div className="declaration-section">
                    <p>وقد أدلى لنا الشخص الماثل أمامنا بما يلي:</p>
                    <div className="flex gap-2"><p>الاسم الشخصي والعائلي: </p><input className="px-3 outline-none focus:border focus:border-blue rounded-[10px] inline-input" placeholder="........................" type="text" name="fullname" value={formData.fullname || ''} onChange={handleInputChange} /></div>
                    <div className="flex gap-2"><p>المزداد(ة) بتاريخ </p><input className="px-3 outline-none focus:border focus:border-blue rounded-[10px] inline-input" placeholder="........................" type="date" name="Dbirth" value={formData.Dbirth || ''} onChange={handleInputChange} /> ب <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px] inline-input" placeholder="........................" type="text" name="placeOfBirth" value={formData.placeOfBirth || ''} onChange={handleInputChange} /></div>
                    <div className="flex gap-2"><p>اسم الأب: </p><input className="px-3 outline-none focus:border focus:border-blue rounded-[10px] inline-input" placeholder="........................" type="text" name="Fname" value={formData.Fname || ''} onChange={handleInputChange} /></div>
                    <div className="flex gap-2"><p>اسم الأم: </p><input className="px-3 outline-none focus:border focus:border-blue rounded-[10px] inline-input" placeholder="........................" type="text" name="Mname" value={formData.Mname || ''} onChange={handleInputChange} /></div>
                    <p>الحامل(ة) لبطاقة التعريف الوطنية رقم </p><input className="px-3 outline-none focus:border focus:border-blue rounded-[10px] inline-input" placeholder="........................" type="text" name="idCard" value={formData.idCard || ''} onChange={handleInputChange} /> الصالحة الى غاية <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px] inline-input" placeholder="........................" type="text" name="idExpiry" value={formData.idExpiry || ''} onChange={handleInputChange} />
                    <p>الجنسية: </p><input className="px-3 outline-none focus:border focus:border-blue rounded-[10px] inline-input" placeholder="........................" type="text" name="nationality" value={formData.nationality || ''} onChange={handleInputChange} /> الساكن(ة) ب <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px] inline-input" placeholder="........................" type="text" name="address" value={formData.address || ''} onChange={handleInputChange} />
                    <p>بصفته(ها): </p><input className="px-3 outline-none focus:border focus:border-blue rounded-[10px] inline-input" placeholder="........................" type="text" name="role" value={formData.role || ''} onChange={handleInputChange} />
                </div>

                <div className="observation-section">
                    <p>وأثناء الاستماع إليه(ها)، صرح(ت) لنا بما يلي:</p>
                    <textarea className="px-3 outline-none focus:border focus:border-blue rounded-[10px] full-width-textarea" placeholder="........................" name="confession" value={formData.confession || ''} onChange={handleInputChange}></textarea>
                </div>

                <div className="additional-info">
                    <p>معلومات إضافية:</p>
                    <textarea className="px-3 outline-none focus:border focus:border-blue rounded-[10px] full-width-textarea" placeholder="........................" name="info" value={formData.info || ''} onChange={handleInputChange}></textarea>
                </div>

                <div className="closing-section">
                    <p>أقفل المحضر بتاريخ <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px] inline-input" placeholder="........................" type="date" name="DATEof" value={formData.DATEof || ''} onChange={handleInputChange} /> على الساعة <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px] inline-input" placeholder="........................" type="time" name="HOURof" value={formData.HOURof || ''} onChange={handleInputChange} /></p>
                    <p>حيث حرر في ثلاث نسخ وسلمت نسخة منه للسيد(ة) <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px] inline-input" placeholder="........................" type="text" name="HISname" value={formData.HISname || ''} onChange={handleInputChange} />.</p>
                    <p>تم إرسال النسخة الأصلية لهذا المحضر إلى السيد وكيل الملك بالمحكمة الابتدائية <input className="px-3 outline-none focus:border focus:border-blue rounded-[10px] inline-input" placeholder="........................" type="text" name="copy" value={formData.copy || ''} onChange={handleInputChange} /></p>
                </div>

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

export default PvPrintable;