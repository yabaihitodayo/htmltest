// 日本語フォントの読み込み
import { jsPDF } from "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
import NotoSansJP from "https://cdn.jsdelivr.net/npm/@jspdf/font-noto-sans-jp@1.0.0/NotoSansJP-normal.js";

// jsPDFに日本語フォントを登録
const { jsPDF } = window.jspdf;
jsPDF.API.events.push(["addFonts", NotoSansJP]);

document.getElementById("reservationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const trainName = document.getElementById("trainName").value;
    const departure = document.getElementById("departure").value;
    const destination = document.getElementById("destination").value;
    const date = document.getElementById("date").value;
    const seatType = document.getElementById("seatType").value;

    const formattedDate = new Date(date).toLocaleString();

    // メッセージ表示
    alert("切符を発券します...");

    // jsPDFオブジェクトを作成
    const doc = new jsPDF();

    // 日本語フォントを設定
    doc.setFont("NotoSansJP", "normal");

    // PDF内容を作成
    doc.setFontSize(20);
    doc.text("切符 (Ticket)", 10, 20);

    doc.setFontSize(12);
    doc.text(`列車名: ${trainName}`, 10, 40);
    doc.text(`出発地: ${departure}`, 10, 50);
    doc.text(`目的地: ${destination}`, 10, 60);
    doc.text(`出発日時: ${formattedDate}`, 10, 70);
    doc.text(`座席タイプ: ${seatType}`, 10, 80);

    // 発券日時
    doc.text(`発券日時: ${new Date().toLocaleString()}`, 10, 100);

    // PDFのダウンロード
    doc.save(`${trainName}_切符.pdf`);

    // 画面に結果表示
    const result = `
        <h2>予約内容</h2>
        <p><strong>列車名:</strong> ${trainName}</p>
        <p><strong>出発地:</strong> ${departure}</p>
        <p><strong>目的地:</strong> ${destination}</p>
        <p><strong>出発日時:</strong> ${formattedDate}</p>
        <p><strong>座席タイプ:</strong> ${seatType}</p>
        <p>切符が発券されました！</p>
    `;

    document.getElementById("reservationResult").innerHTML = result;
});