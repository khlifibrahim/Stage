import react, { useState } from "react";
import './pvcss.css';
import logo from '../../../assets/logo.png';



const Print=()=>{

    const handlePrint=()=>{

        window.print();
    }
    const [data, setData] = useState({})
    const handleDataChange = (e)=> {
        const {name, value} = e.target

        setData(prev => ({
            ...prev,
            [name] : value
        }))
    }


    return(
        <>
        

        <div id='print-area' className="print-container">

            
            {/* Header */}

            <div className="header">
                <div className=''>
                <div className="logo-container text-center">
               <img src={logo} alt="Logo" className="logo" />
                 </div>
                </div>
                <div className='text-center '>
                    <p className="font-bold ">مندوبية الصناعة والتجارة بوجدة</p>
                    <p className="text-base">Délégation de l'industrie et du Comerce d'Oujda</p>
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
                        <td className="left-column">مندوبية وزارة التجارة و الصناعة بوجدة <br/>
                            العنوان:28،شارع الجيش الملكي،ص.ب:729
                            <br/> وجدة،المغرب<br/>
                            + الهاتف:   01 42 86 36 5  212  <br/>
                            + الفاكس:   38 02 68 36 5  212  
                        </td>
                        <td className="right-column">
                                <p className="font-bold text-center">
                                محضر إثباث المخالفات <br/>حرر طبقا للمادة 169 من القانون رقم 31.08  <br/>القاضي بتحديد تدابير لحماية المستهلك
                                </p>
                                <p className="text-center">......./......../....... رقم </p>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="delegates-section">
                <p>انتقلنا نحن الموقعين أسفله:</p>
                <ul>
                    - 
                    <br/>
                    -
                </ul>
                <p>المحلفين والمنتدبين للقيام بأعمال البحث عن المخالفات وإثباتها طبقا لأحكام المادة 166 من القانون رقم 31.08 القاضي بتحديد تدابير لحماية المستهلك والمرسوم رقم 2.12.503 الصادر في 4 ذي القعدة 1434 (11 سبتمبر 2013) بتطبيق بعض أحكام القانون رقم 31.08 سيما المادة 4 منه.</p>
                <p>والعاملين تحت إشراف مندوب وزارة الصناعة والتجارة بوجدة والمفوضين من قبله لمعاينة المخالفات أحكام هذا القانون ونصوصه التطبيقية وإثباتها.</p>
                
            </div>

            <div className="inspection-details">
                <p>في يوم <input type="text" name="day" value={data.day}/> على الساعة <input type="text" name="hour" value={data.hour} /></p>
                <p>إلى المحل التجاري الكائن مقره ب………………………………………………….</p>
                <p>والذي يستغل في بيع………………………………………………..</p>
            </div>

            <div className="observation-section">
                <p>وبعد أن عرضنا على الشخص الماثل أمامنا صفتنا وبطاقاتنا المهنية وأبلغناه بطبيعة مهمتنا وأسسها القانونية، عاينا ما يلي:</p>
                <p>………………………………………………………………………………………………</p>
                <p>………………………………………………………………………………………………</p>
                <p>………………………………………………………………………………………………</p>
                <p>………………………………………………………………………………………………</p>
                <p>………………………………………………………………………………………………</p>
                <p>………………………………………………………………………………………………</p>
                <p>………………………………………………………………………………………………</p>
                <p>………………………………………………………………………………………………</p>
                <p>………………………………………………………………………………………………</p>
                <p>………………………………………………………………………………………………</p>
            </div>

            <div className="declaration-section">
                <p>وقد أدلى لنا الشخص الماثل أمامنا بما يلي:</p>
                <p>االسم الشخصي والعائلي: .................... المزداد(ة) بتاريخ ...................ب..........................</p>
                <p>اسم الأب: …………………………..</p>
                <p>اسم الأم: ……………………………….</p>
                <p>الحامل(ة) لبطاقة التعريف الوطنية رقم ......................... الصالحة الى غاية ........................</p>
                <p>الجنسية : ................. الساكن(ة) ب..........................................................................</p>
                <p>بصفته(ها): …………………………….</p>
            </div>
            
            
            <div className="observation-section">
                <p>وأثناء االستماع إليه(ها)، صرح(ت) لنا بما يلي:</p>
                <p>………………………………………………………………………………………………</p>
                <p>………………………………………………………………………………………………</p>
                <p>………………………………………………………………………………………………</p>
                <p>………………………………………………………………………………………………</p>
                <p>………………………………………………………………………………………………</p>
                <p>………………………………………………………………………………………………</p>
                <p>………………………………………………………………………………………………</p>
                <p>………………………………………………………………………………………………</p>
                <p>………………………………………………………………………………………………</p>
                <p>………………………………………………………………………………………………</p>
            </div>

            <div className="additional-info">
                <p>معلومات إضافية:</p>
                <p>……………………………………………………………………………………………………………</p>
                <p>……………………………………………………………………………………………………………</p>
                <p>……………………………………………………………………………………………………………</p>
                <p>……………………………………………………………………………………………………………</p>
            </div>

            <div className="closing-section">
                <p>أقفل المحضر الذي يتضمن 2 صفحة، بتاريخ ………………………..على الساعة …………………………</p>
                <p>حيث حرر في ثلاث نسخ وسلمت نسخة منه للسيد(ة) …………….</p>
                <p>تم إرسال النسخة الأصلية لهذا المحضر مرفقة بنسختين منه إلى السيد وكيل الملك بالمحكمة الابتدائية……………...</p>
                <p>وبعد الاطلاع على مضمون هذا المحضر والمخالفات المتضمنة فيه، وافق عليها ووقع محضر إثبات المخالفات.</p>
            </div>

            <div className="signature-section">
                <p className="signature-line">توقيع محرر المحضر</p>
            
                <p className="refusal-note">توقيع المصرح<br/>(في حالة رفضه، تتم الإشارة إلى ذلك من طرف الباحث)</p>
            </div>

            <button onClick={handlePrint} className="print-button">
                Imprimer
            </button>
        </div>
        </>
    )
}
export default Print;