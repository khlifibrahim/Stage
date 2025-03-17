import { useEffect, useState } from "react";
import Instance from '../../../../Api/axios';

const DQSM301bis = ({ data }) => {
  console.log('Data insided Print: ', data)
  console.log('Data insided Print: ', data.productname)
  useEffect(() => {
    const fetchCadre = async () => {
      try {
        const response = await Instance.get(`/missions/getCadre/${5}`);
        // const cadrenom = response.data.cadres.nom
        console.log('Prenom :', response.data.prenom)
        const inspector = `${response.data.cadres.nom} ${response.data.prenom}`
        setFormData(prev => ({
          ...prev,
          cadrename: inspector
        }));
      } catch (error) {
        console.error(error);
      }
    };
    fetchCadre();
  }, [data]);

  const [formData, setFormData] = useState({
    productName: data?.productname || ""
  });

  console.log('DQSM301bis:', formData)
  const [pdfBlob, setPdfBlob] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Instance.post("http://localhost:5000/generate-pdf", formData, {
        responseType: "blob",
      });
      setPdfBlob(response.data);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-lg font-bold mb-4">DOSM/SM/301bis.00</h1>
        <h2 className="text-center font-semibold">مراقبة مطابقة المنتجات الصناعية</h2>
        <p className="text-center">للقانون رقم 24.09 بقانون رقم 12.06</p>
        <h3 className="text-center mt-4 font-bold">ملحق العينات</h3>
      </div>

      <form onSubmit={handleSubmit} dir="rtl" className="space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label htmlFor="reportNumber" className="text-right">
              محضر رقم
            </label>
            <input
              id="reportNumber"
              name="reportNumber"
              value={formData.reportNumber}
              onChange={handleChange}
              className="py-2 px-3 border-dotted border-b rounded-[10px] bg-transparent text-right w-3/4 focus:border-solid  focus:outline-[rgba(70,134,229,1)]"
              placeholder="أدخل رقم المحضر"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="name" className="text-right">
              يخص (السيد/ة)
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="py-2 px-3 border-dotted border-b rounded-[10px] bg-transparent text-right w-3/4 focus:border-solid  focus:outline-[rgba(70,134,229,1)]"
              placeholder="أدخل الاسم"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="title" className="text-right">
              بصفته (المهنة)
            </label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="py-2 px-3 border-dotted border-b rounded-[10px] bg-transparent text-right w-3/4 focus:border-solid  focus:outline-[rgba(70,134,229,1)]"
              placeholder="أدخل المهنة"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="institution" className="text-right">
              لدى مؤسسة
            </label>
            <input
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              className="py-2 px-3 border-dotted border-b rounded-[10px] bg-transparent text-right w-3/4 focus:border-solid  focus:outline-[rgba(70,134,229,1)]"
              placeholder="أدخل اسم المؤسسة"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="address" className="text-right">
              العنوان
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border-dotted border-b border-t-0 border-x-0 bg-transparent text-right w-3/4 min-h-[100px] focus:border-solid focus:ring-0 focus:border-[rgba(70,134,229,1)]"
              placeholder="أدخل العنوان"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="samples" className="text-right">
              عينات مطابقة للسلعة المسماة
            </label>
            <textarea
              id="samples"
              name="samples"
              value={formData.samples}
              onChange={handleChange}
              className="border-dotted border-b border-t-0 border-x-0 bg-transparent text-right w-3/4 min-h-[100px] focus:border-solid focus:ring-0 focus:border-[rgba(70,134,229,1)]"
              placeholder="أدخل وصف العينات"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="cityCode" className="text-right">
              حرر في رقم
            </label>
            <input
              id="cityCode"
              name="cityCode"
              value={formData.cityCode}
              onChange={handleChange}
              className="py-2 px-3 border-dotted border-b rounded-[10px] bg-transparent text-right w-3/4 focus:border-solid  focus:outline-[rgba(70,134,229,1)]"
              placeholder="Code de la ville / L/ Numéro d'ordre/Année"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="date" className="text-right">
              تاريخ
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="py-2 px-3 border-dotted border-b rounded-[10px] bg-transparent text-right w-3/4 focus:border-solid  focus:outline-[rgba(70,134,229,1)]"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="signature" className="text-right">
              على الساعة
            </label>
            <input
              id="signature"
              name="signature"
              value={formData.signature}
              onChange={handleChange}
              className="py-2 px-3 border-dotted border-b rounded-[10px] bg-transparent text-right w-3/4 focus:border-solid  focus:outline-[rgba(70,134,229,1)]"
              placeholder="أدخل الوقت"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="declarationValue" className="text-right">
              قيمة البيعة المصرح بها
            </label>
            <input
              id="declarationValue"
              name="declarationValue"
              value={formData.declarationValue}
              onChange={handleChange}
              className="py-2 px-3 border-dotted border-b rounded-[10px] bg-transparent text-right w-3/4 focus:border-solid  focus:outline-[rgba(70,134,229,1)]"
              placeholder="أدخل القيمة"
            />
          </div>

          <div className="flex justify-between items-center">
            <label htmlFor="supervisorName" className="text-right">
              اسم المراقب
            </label>
            <input
              id="supervisorName"
              name="supervisorName"
              value={formData.supervisorName}
              onChange={handleChange}
              className="py-2 px-3 border-dotted border-b rounded-[10px] bg-transparent text-right w-3/4 focus:border-solid  focus:outline-[rgba(70,134,229,1)]"
              placeholder="أدخل اسم المراقب"
            />
          </div>

          <div className="text-center mt-8">
            <p className="mb-4 text-right">توقيع الشخص الذي تم عنده أخذ العينات</p>
            <div className="h-16 border-dotted border border-white rounded-md mb-6"></div>
          </div>
        </div>

        <div className="flex justify-center pt-6">
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
};

export default DQSM301bis;
