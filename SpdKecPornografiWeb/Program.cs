using System.Text;
using DinkToPdf;
using DinkToPdf.Contracts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SpdKecPornografiWeb.Context;
using SpdKecPornografiWeb.GraphQL.Mutations;
using SpdKecPornografiWeb.GraphQL.Queries;
using SpdKecPornografiWeb.Middlewares;
using SpdKecPornografiWeb.Repositories;
using SpdKecPornografiWeb.Repositories.Interfaces;
using SpdKecPornografiWeb.Security;
using SpdKecPornografiWeb.Services;
using SpdKecPornografiWeb.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddHttpContextAccessor();
builder.Services.AddControllersWithViews();

// Take connection strings
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
// Override with environment variable
var portfolioConnectionString = Environment.GetEnvironmentVariable("DB_CONNECTION");
if (!string.IsNullOrEmpty(portfolioConnectionString))
{
    connectionString = portfolioConnectionString;
}
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(connectionString);
});

builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("JWT Bearer", new OpenApiSecurityScheme
    {
        Description = "This is a JWT bearer authentication scheme",
        In = ParameterLocation.Header,
        Scheme = "Bearer",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http
    });
    
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme{
                Reference = new OpenApiReference{
                    Id = "JWT Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            }, new List<string>()
        }
    });
});

#region Dependencies
builder.Services.AddTransient(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddTransient<IPersistence, Persistence>();
builder.Services.AddTransient<IAccountService, AccountService>();
builder.Services.AddTransient<IJwtUtil, JwtUtil>();
builder.Services.AddTransient<IPhotoService, PhotoService>();
builder.Services.AddTransient<IQuestionService, QuestionService>();
builder.Services.AddTransient<IAnswerService, AnswerService>();
builder.Services.AddTransient<IDiagnosisService, DiagnosisService>();
builder.Services.AddTransient<IAnswerDiagnosisService, AnswerDiagnosisService>();
builder.Services.AddTransient<ITrxTestingRepository, TrxTestingRepository>();
builder.Services.AddTransient<ITrxTestingService, TrxTestingService>();
builder.Services.AddTransient<IResultHistoryService, ResultHistoryService>();
builder.Services.AddTransient<IEmailService, EmailService>();
builder.Services.AddTransient<IOtpService, OtpService>();
builder.Services.AddTransient<IDashboardService, DashboardService>();
builder.Services.AddTransient<IRazorViewTemplateService, RazorViewsRazorViewTemplateService>();
builder.Services.AddTransient<IPdfService, PdfService>();

builder.Services.AddTransient<DiagnosisMutation>();
builder.Services.AddTransient<LoginMutation>();
builder.Services.AddTransient<DiagnosisQuery>();
builder.Services.AddTransient<AnswerQuery>();
builder.Services.AddTransient<RelationQuery>();
#endregion

#region Middleware
builder.Services.AddScoped<ExceptionHandlingMiddleware>();
#endregion

#region Jwt Setting
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = false,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Key"]))
    };
});
#endregion

builder.Services
    .AddGraphQLServer()
    .AddAuthorization()
    .AddQueryType(q => q.Name("Query"))
    .AddType<DiagnosisQuery>()
    .AddType<AnswerQuery>()
    .AddType<RelationQuery>()
    .AddMutationType(m => m.Name("Mutation"))
    .AddType<LoginMutation>()
    .AddType<DiagnosisMutation>();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

// Endpoint mapping
app.MapGraphQL("/graphql");      
app.MapControllers();   
app.MapFallbackToFile("index.html");

app.Run();