using DinkToPdf;
using PuppeteerSharp;
using PuppeteerSharp.Media;
using SpdKecPornografiWeb.Services.Interfaces;

namespace SpdKecPornografiWeb.Services;

public class PdfService : IPdfService
{
    private readonly IConfiguration _configuration;

    public PdfService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task<byte[]> GeneratePdf(string htmlContent, PdfOptions? pdfOption)
    {
        await using var browser = await Puppeteer.LaunchAsync(new LaunchOptions
        {
            Headless = true,
            ExecutablePath = _configuration["ExecPdf:Chrome"],
            Args = new []{"--no-sandbox"}
        }).ConfigureAwait(false);
        
        await using var page = await browser.NewPageAsync();
        await page.EmulateMediaTypeAsync(MediaType.Screen);
        await page.SetContentAsync(htmlContent);
        
        var pdfDefault = new PdfOptions
        {
            MarginOptions = new MarginOptions
            {
                Bottom = "10px",
                Top = "10px",
                Left = "20px",
                Right = "20px",
            },
            Format = PaperFormat.A4,
            PrintBackground = true,
            Landscape = true,
        };
        
        var pdfContent = await page.PdfDataAsync(pdfOption ?? pdfDefault);
        return pdfContent;
    }
}