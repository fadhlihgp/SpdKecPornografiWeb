namespace SpdKecPornografiWeb.Services.Interfaces;

public interface IRazorViewTemplateService
{
    Task<string> RenderAsync<TViewModel>(string templateFileName, TViewModel viewModel);
}