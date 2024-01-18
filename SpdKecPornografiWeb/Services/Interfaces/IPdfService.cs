using PuppeteerSharp;

namespace SpdKecPornografiWeb.Services.Interfaces;

public interface IPdfService
{
    Task<byte[]> GeneratePdf(string htmlContent, PdfOptions? pdfOption);
}