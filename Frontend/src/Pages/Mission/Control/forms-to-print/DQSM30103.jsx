import React, { useState, useEffect } from 'react'

function DQSM30103({ data, onDataChange }) {
  const [formData, setFormData] = useState({
    reportNumber: "",
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    supervisorName: "",
    supervisorId: "",
    department: "",
    storageOption: "",
    personDeclaration: "",
    additionalInfo: "",
    companyName: data?.enterprise?.raison_sociale || "",
    companyAddress: data?.enterprise?.adresse_siege || "",
    productName: data?.productname || ""
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    
    // Pass data back to parent component
    if (onDataChange) {
      onDataChange(updatedFormData);
    }
  };

  const handleCheckboxChange = (value) => {
    const updatedFormData = {
      ...formData,
      storageOption: value
    };
    
    setFormData(updatedFormData);

    if (onDataChange) {
      onDataChange(updatedFormData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen p-4 md:p-6 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6 border-b pb-4  mx-[10%] ">
        <div className="text-left w-1/3">
          <p>Royaume du Maroc</p>
          <p>Ministère de l'Industrie,du Commerce, de l'Investissement et de l'Économie Numérique</p>
        </div>
        <div className="w-1/3 flex justify-center">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-black">Logo</div>
        </div>
        <div className="text-right w-1/3">
          <p>المملكــــة المغربيــــة</p>
          <p>وزارة الصناعـــــــة والتجـــارة والاستثمـــار والاقتصـــاد الرقمـــــي</p>
          <p className="mt-2">DQSM/SM/301.03</p>
        </div>
      </div>

      <form  dir="rtl" className="space-y-6">
        {/* Title Section */}
        <div className="text-center mb-6 mx-[10%]">
          <p className="">
            مراقبة مطابقة المنتوجات الصناعية للقانون رقم 24.09 المتعلق بسلامة المنتوجات والخدمات وللقانون رقم 12.06
            المتعلق بالتقييس والشهادة بالمطابقة والاعتماد</p>
          <p className="text-lg font-bold mt-2">محضر أخذ العينات</p>
        </div>

        {/* Report Number Section */}
        <div className="flex justify-end items-center">
          <label htmlFor="reportNumber" className="text-right ml-2">
            رقم
          </label>
          <input
            id="reportNumber"
            name="reportNumber"
            value={formData.reportNumber}
            onChange={handleChange}
            className="border-dotted border-b border-t-0 border-x-0 bg-transparent text-right w-1/3 focus:border-solid focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]"
            placeholder="أدخل الرقم"
          />
        </div>

        {/* Date and Time Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <label htmlFor="time" className="text-right ml-2">
              الساعة
            </label>
            <input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              className="border-dotted border-b border-t-0 border-x-0 bg-transparent text-right w-32 focus:border-solid focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="date" className="text-right ml-2">
              التاريخ
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="border-dotted border-b border-t-0 border-x-0 bg-transparent text-right w-40 focus:border-solid focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]"
            />
          </div>
        </div>

        {/* Supervisor Table */}
        <div className="overflow-x-auto ">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-black p-2 text-right">اسم المراقب</th>
                <th className="border border-black p-2 text-right">المندوبية</th>
                <th className="border border-black p-2 text-right">رقم بطاقة المراقب</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black p-2">
                  <input
                    name="supervisorName"
                    value={formData.supervisorName}
                    onChange={handleChange}
                    className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]"
                    placeholder="اسم المراقب"
                  />
                </td>
                <td className="border border-black p-2">
                  <input
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]"
                    placeholder="المندوبية"
                  />
                </td>
                <td className="border border-black p-2">
                  <input
                    name="supervisorId"
                    value={formData.supervisorId}
                    onChange={handleChange}
                    className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]"
                    placeholder="رقم البطاقة"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Company Information Section */}
        <div>
          <h3 className="text-right mb-2">معلومات عن حائز المنتج وملكيته (مرفقة في حالة للتاجر)</h3>
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead>
                <tr>
                  <th className="border border-black p-2 text-right">العنوان الشخصي للشخص الذي تم عنده أخذ العينات</th>
                  <th className="border border-black p-2 text-right">
                    المقر الاجتماعي للشركة أو للشخص الذي تم عنده أخذ العينات
                  </th>
                  <th className="border border-black p-2 text-right">
                    رقم السجل التجاري أو رقم ب.ت.و للشخص الذي تم عنده أخذ العينات
                  </th>
                  <th className="border border-black p-2 text-right">الاسم الكامل للشخص</th>
                  <th className="border border-black p-2 text-right">نسبة الشركة أو شخص الذي تم لديه أخذ العينات</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2 h-12"><input type="text" className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]" placeholder='........' name="" id="" /></td>
                  <td className="border border-black p-2 h-12"><input type="text" className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]" placeholder='........' name="" id="" /></td>
                  <td className="border border-black p-2 h-12"><input type="text" className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]" placeholder='........' name="" id="" /></td>
                  <td className="border border-black p-2 h-12"><input type="text" className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]" placeholder='........' name="" id="" /></td>
                  <td className="border border-black p-2 h-12"><input type="text" className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]" placeholder='........' name="" id="" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Information Section */}
        <div>
          <h3 className="text-right mb-2">معلومات عن المنتج أثناء أخذ العينات للفحص</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-black p-2 text-right">المقر الاجتماعي للشركة أو العنوان المهني</th>
                  <th className="border border-black p-2 text-right">اسم الشخص المعنوي أو الطبيعي المنتج</th>
                  <th className="border border-black p-2 text-right">نسبة الشركة أو المنتج</th>
                  <th className="border border-black p-2 text-right">رقم السجل التجاري أو رقم ب.ت.و للشخص المنتج</th>
                  <th className="border border-black p-2 text-right">نسبة شركة المنتج أو الشخص المنتج</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2 h-12"><input type="text" className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]" placeholder='.......' /></td>
                  <td className="border border-black p-2 h-12"><input type="text" className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]" placeholder='.......' /></td>
                  <td className="border border-black p-2 h-12"><input type="text" className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]" placeholder='.......' /></td>
                  <td className="border border-black p-2 h-12"><input type="text" className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]" placeholder='.......' /></td>
                  <td className="border border-black p-2 h-12"><input type="text" className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]" placeholder='.......' /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Details Section */}
        <div>
          <h3 className="text-right mb-2">معلومات عن المنتج</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-black p-2 text-right">معلومات إضافية</th>
                  <th className="border border-black p-2 text-right">رقم السلسلة / الدفعة</th>
                  <th className="border border-black p-2 text-right">الحالة</th>
                  <th className="border border-black p-2 text-right">تسميته</th>
                  <th className="border border-black p-2 text-right">نوعية / طبيعة المنتج</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2 h-12"><input type="text" className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]" placeholder='.......' /></td>
                  <td className="border border-black p-2 h-12"><input type="text" className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]" placeholder='.......' /></td>
                  <td className="border border-black p-2 h-12"><input type="text" className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]" placeholder='.......' /></td>
                  <td className="border border-black p-2 h-12"><input type="text" className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]" placeholder='.......' /></td>
                  <td className="border border-black p-2 h-12"><input type="text" className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]" placeholder='.......' /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Samples Information Section */}
        <div>
          <h3 className="text-right mb-2">معلومات عن العينات</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-black p-2 text-right">معلومات إضافية</th>
                  <th className="border border-black p-2 text-right">القيمة التقديرية عند الاقتضاء</th>
                  <th className="border border-black p-2 text-right">الكمية المأخوذة</th>
                  <th className="border border-black p-2 text-right">نوعية / طبيعة العينات</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-black p-2 h-12"><input type="text" placeholder='.......' className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]" /></td>
                  <td className="border border-black p-2 h-12"><input type="text" placeholder='.......' className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]" /></td>
                  <td className="border border-black p-2 h-12"><input type="text" placeholder='.......' className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]" /></td>
                  <td className="border border-black p-2 h-12"><input type="text" placeholder='.......' className="border-0 bg-transparent text-right w-full focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side Information */}
        <div className="space-y-6 mt-8">
          <div className="text-right">
            <p>الظروف التي تم فيها أخذ العينات</p>
            <input placeholder='..............................................................' className="border-dotted border-b border-t-0 border-x-0 bg-transparent text-right w-full focus:border-solid focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]" />
          </div>

          <div className="flex flex-row-reverse justify-end items-center gap-8">
            <div className="flex items-center gap-2">
              <input
                type='radio'
                id="Storage"
                name="accepte"
                value="accepte"
                checked={formData.storageOption === "accepte"}
                onChange={(e) => handleCheckboxChange(e.target.value)}
                className="border-black "
              />
              <label htmlFor="afterStorage">قبل الاحتفاظ بها</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type='radio'
                id="Storage"
                name="declined"
                value="declined"
                checked={formData.storageOption === "declined"}
                onChange={(e) => handleCheckboxChange(e.target.value)}
                className="border-black "
              />
              <label htmlFor="beforeStorage">رفض الاحتفاظ بها</label>
            </div>
            <p>الجهة الواجب تركها لدى حائز السلعة:</p>
          </div>

          <div className="text-right">
            <p>الوثائق المثبتة والمرفقة بالملحق</p>
            <input placeholder='..............................................................' className="border-dotted border-b border-t-0 border-x-0 bg-transparent text-right w-full focus:border-solid focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]" />
          </div>

          <div className="text-right">
            <p>تصريح الشخص الذي تم عنده أخذ العينات قبل أخذ العينة</p>
            <textarea
              placeholder='..............................................................'
              name="personDeclaration"
              value={formData.personDeclaration}
              onChange={handleChange}
              className="border-dotted border-b border-t-0 border-x-0 bg-transparent text-right w-full min-h-[80px] focus:border-solid focus-visible:ring-0 focus:outline-[rgba(70,134,229,1)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-right">
              <p>توقيع المراقب الذي أخذ العينات</p>
              <div className="h-16  mt-2"></div>
            </div>
            <div className="text-right">
              <p>توقيع الشخص الذي تم عنده أخذ العينات</p>
              <p className="text-xs">(في حالة رفضه تتم الإشارة إلى ذلك من طرف المراقب)</p>
              <div className="h-16  mt-2"></div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-8">
          <button
            type="submit"
            className="bg-[rgba(70,134,229,0.25)] text-white hover:bg-[rgba(70,134,229,0.35)] px-8 py-2 rounded-md"
          >
            تقديم النموذج
          </button>
        </div>
      </form>
    </div>
  )
}

export default DQSM30103