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
    <div className="p-6 bg-white shadow-md rounded-lg text-right">
      <h2 className="text-xl font-bold mb-4">ملصق العينات</h2>
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col flex-wrap items-end w-full">
        <div className="w-1/2">
          <p>محضر رقم </p>
          <input 
              type="text" 
              name="numberid" 
              placeholder=".............." 
              value={formData.numberid} 
              onChange={handleChange} className="w-full basis-full  p-2 rounded outline-none border-none placeholder:text-right text-right" required />
        </div>
        <div className="w-1/2">
          <p>يخص السيد(ة)</p>
          <input 
            type="text" 
            name="cadrename" 
            placeholder="............." 
            value={formData.cadrename} 
            onChange={handleChange} className="w-full basis-full  p-2 border rounded border-none placeholder:text-right text-right" required />
        </div>
        <div className="w-1/2">
          <p>بوصفه</p>
          <input 
              type="text" 
              name="profession" 
              placeholder="......................." 
              value={formData.desc} 
              onChange={handleChange} className="w-full basis-full  p-2 border rounded" required /></div>
        <div className="w-1/2">
          <p>(المهنة)</p>
          <input 
              type="text" 
              name="profession" 
              placeholder="......................." 
              value={formData.profession} 
              onChange={handleChange} className="w-full basis-full  p-2 border rounded" required /></div>
        <div className="w-1/2">
          <p>لدى المؤسسة </p>
          <input 
            type="text" 
            name="institution" 
            placeholder="........................" 
            value={formData.institution} 
            onChange={handleChange} className="w-full basis-full  p-2 border rounded" required />
        </div>
        <div className="w-1/2">
          <p>العنوان</p>
          <input 
            type="text" 
            name="address" 
            placeholder="......................." 
            value={formData.address} 
            onChange={handleChange} className="w-full basis-full  p-2 border rounded" required />
        </div>
        <div className="w-1/2">
          <p>تم أخذ </p>
          <input 
              type="text" 
              name="sampleNumber" 
              placeholder="....................." 
              value={formData.sampleNumber} 
              onChange={handleChange} className="w-full basis-full  p-2 border rounded" required />
        </div>
        <input 
            type="text" 
            name="recipientName" 
            placeholder="Recipient Name" 
            value={formData.recipientName} 
            onChange={handleChange} className="w-full basis-full  p-2 border rounded" required />
        <input 
            type="text" 
            name="productName" 
            placeholder="Product Name" 
            value={formData.productName} 
            onChange={handleChange} className="w-full basis-full  p-2 border rounded" required />
        <input 
            type="number" 
            name="quantity" 
            placeholder="Quantity" 
            value={formData.quantity} 
            onChange={handleChange} className="w-full basis-full  p-2 border rounded" required />
        <input 
            type="text" 
            name="code" 
            placeholder="Code de la ville / Numéro d’ordre / Année" 
            value={formData.code} 
            onChange={handleChange} className="w-full basis-full  p-2 border rounded" required />
        <input 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} className="w-full basis-full  p-2 border rounded" required />
        <input 
            type="time" 
            name="time" 
            value={formData.time} 
            onChange={handleChange} className="w-full basis-full  p-2 border rounded" required />
        <input 
            type="text" 
            name="storageLocation" 
            placeholder="Sample Storage Location" 
            value={formData.storageLocation} 
            onChange={handleChange} className="w-full basis-full  p-2 border rounded" required />
        <input 
            type="text" 
            name="declaredValue" 
            placeholder="Declared Value" value={formData.declaredValue} 
            onChange={handleChange} className="w-full basis-full  p-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Generate PDF</button>
      </form>

      {pdfBlob && (
        <a href={URL.createObjectURL(pdfBlob)} download="301bis.00-report.pdf" className="mt-4 block text-center bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Download PDF
        </a>
      )}
    </div>
  );
};

export default DQSM301bis;
