export default function TagihanCard({ tagihan, onAdd }) {
  return (
    <div className="border p-3 rounded-lg flex justify-between items-center shadow">
      <div>
        <p className="font-semibold">{tagihan.title}</p>
        <p className="text-sm text-gray-600">
          Total: Rp {tagihan.total.toLocaleString()}
        </p>
      </div>
      <button
        onClick={onAdd}
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
      >
        Tambah
      </button>
    </div>
  );
}
