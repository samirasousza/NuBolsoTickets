import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import QRCode from 'qrcode';
import Logo from '../../assets/NuBolsoLogo.png';
import { ImageToBase64 } from './assets/ImageToBase64';

function CreatePDF(event) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  // Função para gerar QR code
  const generateQRCode = async (url) => {
    try {
      const qrCodeUrl = await QRCode.toDataURL(url);
      return qrCodeUrl;
    } catch (err) {
      console.error('Error generating QR code:', err);
    }
  };

  // Função para criar o PDF após converter a imagem e gerar o QR code
  const generatePdf = async (base64Image, qrCodeUrl) => {
    const reportTitle = {
      text: 'Ingresso',
      fontSize: 25,
      bold: true,
      color: '#000000',
      alignment: 'center',
      margin: [0, 20, 0, 20],
    };

    const detailsContent = [
      {
        text: `Nome: ${event.name}`,
        fontSize: 16,
        margin: [10, 10], // Ajusta o deslocamento do texto
        bold: true,
      },
      {
        text: `Data: ${new Date(event.dates.start.dateTime).toLocaleString()}`,
        fontSize: 14,
        margin: [10, 5], // Ajusta o deslocamento do texto
      },
      {
        text: `Local: ${event._embedded.venues[0].name}`,
        fontSize: 14,
        margin: [10, 5], // Ajusta o deslocamento do texto
      },
      {
        text: `Endereço: ${event._embedded.venues[0].address.line1}`,
        fontSize: 14,
        margin: [10, 5], // Ajusta o deslocamento do texto
      },
      {
        text: `Preço: ${event.priceRanges ? `${event.priceRanges[0].min} - ${event.priceRanges[0].max} ${event.priceRanges[0].currency}` : 'Preço não disponível'}`,
        fontSize: 14,
        margin: [10, 5], // Ajusta o deslocamento do texto
      },
      {
        text: `Descrição: ${event.info ? event.info : 'Descrição não disponível'}`,
        fontSize: 14,
        margin: [10, 5], // Ajusta o deslocamento do texto
      },
    ];

    const details = [
      {
        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 50,
            w: 600, // Ajuste conforme necessário
            h: 210, // Ajuste conforme necessário
            color: '#f0f0f0', // Cor de fundo do retângulo
          },
        ],
        absolutePosition: { x: 30, y: 100 }, // Ajuste conforme necessário
        margin: [0, 20],
      },
      {
        columns: [
          {
            width: '*',
            stack: detailsContent,
            margin: [10, 0], // Adiciona deslocamento geral à coluna de detalhes
          },
          {
            width: 'auto',
            stack: [
              {
                image: qrCodeUrl,
                width: 150, // Tamanho do QR code
                alignment: 'center',
                margin: [0, 10, 0, 20],
              },
            ],
            alignment: 'center',
          },
        ],
        margin: [0, 20],
        columnGap: 20,
      },
    ];

    const footer = [
      {
        image: base64Image,
        width: 100,
        alignment: 'center',
        margin: [0, 20, 0, 10],
      },
      {
        text: 'Obrigado por comprar conosco!',
        fontSize: 12,
        color: '#000000',
        alignment: 'center',
        margin: [0, 5, 0, 0],
      },
    ];

    const docDefinitions = {
      pageSize: 'A4',
      pageMargins: [30, 40, 30, 60],
      content: [
        reportTitle,
        ...details,
        {
          stack: footer,
          margin: [0, 20],
          alignment: 'center',
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        footer: {
          fontSize: 12,
          color: '#555555',
        },
      },
    };

    pdfMake.createPdf(docDefinitions).download();
  };

  // Converter a imagem para base64 e gerar o QR code
  ImageToBase64(Logo, async (base64Image) => {
    const qrCodeUrl = await generateQRCode('https://example.com'); // Substitua pela URL do evento ou outro link relevante
    generatePdf(base64Image, qrCodeUrl);
  });
}

export default CreatePDF;
