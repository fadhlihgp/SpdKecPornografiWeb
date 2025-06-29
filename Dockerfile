FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

WORKDIR /app
ARG BUILD_CONFIGURATION=Release

# Install Node
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y \
        nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .
RUN dotnet restore

RUN dotnet publish -c Release -o /app/out /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

EXPOSE 80
ENTRYPOINT ["dotnet", "SpdKecPornografiWeb.dll"]
