import { useState } from "react"

export default function BonDeCommande() {
  const [formData, setFormData] = useState({
    dpci: "",
    domNumber: "",
    samplingNumber: "",
    product: "",
    sampleQuantity: "",
    samplingDate: "",
    laboratory: "",
    controlAgent: "",
    importerRepresentative: "",
    sampleReceptionDate: "",
    quantityObservations: "",
    labManagerName: "",
    labManagerSignature: "",
    tests: [{ testNumber: "", testDescription: "", observations: "" }],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    let number = 0;
    setFormData((prev) => ({ 
        ...prev, 
        testNumber: number + 1,
        [name]: value,
    }))
  }

  const handleTestChange = (index, field, value) => {
    const updatedTests = [...formData.tests]
    updatedTests[index] = { ...updatedTests[index], [field]: value }
    setFormData((prev) => ({ ...prev, tests: updatedTests }))
  }

  const addNewTestRow = () => {
    setFormData((prev) => ({
      ...prev,
      tests: [...prev.tests, { testNumber: "", testDescription: "", observations: "" }],
    }))
  }

  const removeTestRow = (index) => {
    if (formData.tests.length > 1) {
      const updatedTests = [...formData.tests]
      updatedTests.splice(index, 1)
      setFormData((prev) => ({ ...prev, tests: updatedTests }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-white text-black p-4 md:p-6 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6 border-b pb-4">
        <div className="text-left w-1/3 text-xs">
          <p>Royaume du Maroc</p>
          <p>Ministère de l'Industrie,</p>
          <p>du Commerce, de l'Investissement</p>
          <p>et de l'Économie Numérique</p>
        </div>
        <div className="w-1/3 flex justify-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">Logo</div>
        </div>
        <div className="text-right w-1/3 text-xs">
          <p>المملكــــة المغربيــــة</p>
          <p>وزارة الصناعـــــــة</p>
          <p>والتجـــارة والاستثمـــار</p>
          <p>والاقتصـــاد الرقمـــــي</p>
          <p className="mt-2">DQSM/SM/93.07</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Section */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold uppercase">BON DE COMMANDE</h1>
        </div>

        {/* Header Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-black">
            <tbody>
              <tr>
                <td className="border border-black p-2 w-1/3">
                  <div className="flex items-center">
                    <span>DPCI</span>
                    <input
                      name="dpci"
                      value={formData.dpci}
                      onChange={handleChange}
                      className="border-0 border-b border-dotted border-black bg-transparent ml-2 focus-visible:ring-0 focus-visible:border-[rgba(70,134,229,1)]"
                      placeholder=". . . . . . . . . . . . . . . . . . . . . . . . . . . . ."
                    />
                  </div>
                </td>
                <td className="border border-black p-2 w-1/3">
                  <div className="flex items-center">
                    <span>DOM n°</span>
                    <input
                      name="domNumber"
                      value={formData.domNumber}
                      onChange={handleChange}
                      className="border-0 border-b border-dotted border-black bg-transparent ml-2 focus-visible:ring-0 focus-visible:border-[rgba(70,134,229,1)]"
                      placeholder=". . . . . . . . . . . . . . . . . . . . . . . . . . . . ."
                    />
                  </div>
                </td>
                <td className="border border-black p-2 w-1/3">
                  <div className="flex items-center">
                    <span>N° de prélèvement</span>
                    <input
                      name="samplingNumber"
                      value={formData.samplingNumber}
                      onChange={handleChange}
                      className="border-0 border-b border-dotted border-black bg-transparent ml-2 focus-visible:ring-0 focus-visible:border-[rgba(70,134,229,1)]"
                      placeholder=". . . . . . . . . . . . . . . . . . . . . . . . . . . . ."
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Main Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-black">
            <tbody>
              <tr>
                <td className="border border-black p-2" colSpan={2}>
                  <div className="flex items-center">
                    <span>Produit</span>
                    <input
                      name="product"
                      value={formData.product}
                      onChange={handleChange}
                      className="border-0 border-b border-dotted border-black bg-transparent ml-2 focus-visible:ring-0 focus-visible:border-[rgba(70,134,229,1)]"
                      placeholder=". . . . . . . . . . . . . . . . . . . . . . . . . . . . ."
                    />
                  </div>
                </td>
                <td className="border border-black p-2" colSpan={2}>
                  <div className="flex items-center">
                    <span>Laboratoire</span>
                    <input
                      name="laboratory"
                      value={formData.laboratory}
                      onChange={handleChange}
                      className="border-0 border-b border-dotted border-black bg-transparent ml-2 focus-visible:ring-0 focus-visible:border-[rgba(70,134,229,1)]"
                      placeholder=". . . . . . . . . . . . . . . . . . . . . . . . . . . . ."
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2" rowSpan={2}>
                  <div className="flex flex-col">
                    <span>Quantité de l'échantillon transmis:</span>
                    <input
                      name="sampleQuantity"
                      value={formData.sampleQuantity}
                      onChange={handleChange}
                      className="border-0 border-b border-dotted border-black bg-transparent mt-2 focus-visible:ring-0 focus-visible:border-[rgba(70,134,229,1)]"
                      placeholder=". . . . . . . . . . . . . . . . . . . . . . . . . . . . ."
                    />
                  </div>
                </td>
                <td className="border border-black p-2">
                  <div className="flex flex-col">
                    <span>Agent de contrôle:</span>
                    <input
                      name="controlAgent"
                      value={formData.controlAgent}
                      onChange={handleChange}
                      className="border-0 border-b border-dotted border-black bg-transparent mt-2 focus-visible:ring-0 focus-visible:border-[rgba(70,134,229,1)]"
                      placeholder=". . . . . . . . . . . . . . . . . . . . . . . . . . . . ."
                    />
                  </div>
                </td>
                <td className="border border-black p-2" rowSpan={1}>
                  <div className="flex flex-col">
                    <span>Signature:</span>
                    <input
                      className="border-0 border-b border-dotted border-black bg-transparent mt-2 focus-visible:ring-0 focus-visible:border-[rgba(70,134,229,1)]"
                      placeholder=". . . . . . . . . . . . . . . . . . . . . . . . . . . . ."
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2">
                  <div className="flex flex-col">
                    <span>Importateur ou son représentant:</span>
                    <input
                      name="importerRepresentative"
                      value={formData.importerRepresentative}
                      onChange={handleChange}
                      className="border-0 border-b border-dotted border-black bg-transparent mt-2 focus-visible:ring-0 focus-visible:border-[rgba(70,134,229,1)]"
                      placeholder=". . . . . . . . . . . . . . . . . . . . . . . . . . . . ."
                    />
                  </div>
                </td>
                <td className="border border-black p-2">
                  <div className="flex flex-col">
                    <span>Signature:</span>
                    <input
                      className="border-0 border-b border-dotted border-black bg-transparent mt-2 focus-visible:ring-0 focus-visible:border-[rgba(70,134,229,1)]"
                      placeholder=". . . . . . . . . . . . . . . . . . . . . . . . . . . . ."
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border border-black p-2" colSpan={3}>
                  <div className="flex items-center">
                    <span>Date de prélèvement:</span>
                    <input
                      name="samplingDate"
                      value={formData.samplingDate}
                      onChange={handleChange}
                      className="border-0 border-b border-dotted border-black bg-transparent ml-2 focus-visible:ring-0 focus-visible:border-[rgba(70,134,229,1)]"
                      placeholder=". . . . . . . . . . . . . . . . . . . . . . . . . . . . ."
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Laboratory Section */}
        <div className="border border-black p-4">
          <h2 className="font-bold mb-2">Cadre réservé au Laboratoire :</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <span>Date de réception des échantillons :</span>
              <input
                name="sampleReceptionDate"
                value={formData.sampleReceptionDate}
                onChange={handleChange}
                className="border-0 border-b border-dotted border-black bg-transparent ml-2 focus-visible:ring-0 focus-visible:border-[rgba(70,134,229,1)]"
                placeholder=". . . . . . . . . . . . . . . . . . . . . . . . . . . . ."
              />
            </div>
            <div className="flex items-center">
              <span>Observations sur la quantité reçue :</span>
              <input
                name="quantityObservations"
                value={formData.quantityObservations}
                onChange={handleChange}
                className="border-0 border-b border-dotted border-black bg-transparent ml-2 focus-visible:ring-0 focus-visible:border-[rgba(70,134,229,1)]"
                placeholder=". . . . . . . . . . . . . . . . . . . . . . . . . . . . ."
              />
            </div>
            <div>
              <p className="font-bold">Responsable laboratoire :</p>
              <div className="ml-4 space-y-2 mt-2">
                <div className="flex items-center">
                  <span>Nom :</span>
                  <input
                    name="labManagerName"
                    value={formData.labManagerName}
                    onChange={handleChange}
                    className="border-0 border-b border-dotted border-black bg-transparent ml-2 focus-visible:ring-0 focus-visible:border-[rgba(70,134,229,1)]"
                    placeholder=". . . . . . . . . . . . . . . . . . . . . . . . . . . . ."
                  />
                </div>
                <div className="flex items-center">
                  <span>Signature :</span>
                  <input
                    name="labManagerSignature"
                    value={formData.labManagerSignature}
                    onChange={handleChange}
                    className="border-0 border-b border-dotted border-black bg-transparent ml-2 focus-visible:ring-0 focus-visible:border-[rgba(70,134,229,1)]"
                    placeholder=". . . . . . . . . . . . . . . . . . . . . . . . . . . . ."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tests Table with Dynamic Rows */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold">Tests:</h2>
            <button
              type="button"
              onClick={addNewTestRow}
              className="flex items-center gap-1 bg-[rgba(70,134,229,0.25)] text-black hover:bg-[rgba(70,134,229,0.35)] px-3 py-1 rounded-md border border-black"
            >
              
              Ajouter un test
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-black">
              <thead>
                <tr>
                  <th className="border border-black p-2 w-1/12">N° d'ordre d'essai</th>
                  <th className="border border-black p-2">Libellé de l'essai</th>
                  <th className="border border-black p-2 w-1/3">Observations</th>
                  <th className="border border-black p-2 w-[60px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {formData.tests.map((test, index) => (
                  <tr key={index}>
                    <td className="border border-black p-2">
                      <input
                        value={test.testNumber}
                        onChange={(e) => handleTestChange(index, "testNumber", e.target.value)}
                        className="border-0 bg-transparent w-full focus-visible:ring-0 focus-visible:border-[rgba(70,134,229,1)]"
                        placeholder=". . . . . ."
                      />
                    </td>
                    <td className="border border-black p-2">
                      <input
                        value={test.testDescription}
                        onChange={(e) => handleTestChange(index, "testDescription", e.target.value)}
                        className="border-0 bg-transparent w-full focus-visible:ring-0 focus-visible:border-[rgba(70,134,229,1)]"
                        placeholder=". . . . . . . . . . . . . . . . . . . . . . . . . . . . ."
                      />
                    </td>
                    <td className="border border-black p-2">
                      <input
                        value={test.observations}
                        onChange={(e) => handleTestChange(index, "observations", e.target.value)}
                        className="border-0 bg-transparent w-full focus-visible:ring-0 focus-visible:border-[rgba(70,134,229,1)]"
                        placeholder=". . . . . . . . . . . . . . . . . . . . . . . . . . . . ."
                      />
                    </td>
                    <td className="border border-black p-2 text-center">
                      {formData.tests.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTestRow(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center pt-6">
          <button
            type="submit"
            className="bg-[rgba(70,134,229,0.25)] text-black hover:bg-[rgba(70,134,229,0.35)] px-8 py-2 rounded-md border border-black"
          >
            Soumettre
          </button>
        </div>
      </form>
    </div>
  )
}

