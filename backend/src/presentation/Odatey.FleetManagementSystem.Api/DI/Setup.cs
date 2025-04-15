namespace Odatey.FleetManagementSystem.Api.DI;

public static class Setup
{
    public static WebApplication AddServices(this WebApplicationBuilder builder)
    {
        //AddSwagger(builder.Services);
        
        var tenantDatabaseSettings = new TenantDatabaseSettings();
        builder.Configuration.GetSection("TenantDatabaseSettings").Bind(tenantDatabaseSettings);
        builder.Services.AddSingleton(tenantDatabaseSettings);
        
        builder.Services.RegisterApplication();
        builder.Services.AddPersistenceDependencies(builder.Configuration);
        builder.Services.AddTenantsPersistenceDependencies(builder.Configuration);
        builder.Services.RegisterExternalServices();
        
        builder.Services.AddHttpContextAccessor();
        
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.Authority = builder.Configuration["Auth0:Domain"];
                options.Audience = builder.Configuration["Auth0:Audience"];
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    NameClaimType = ClaimTypes.NameIdentifier
                };
            });

        builder.Services.AddAuthorization();

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("Open", b =>
                b.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials());
        });
        
        builder.Services.AddFastEndpoints();
        return builder.Build();
    }

    public static WebApplication AddPipeline(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger(options =>
            {
                options.RouteTemplate = "openapi/{documentName}.json";
            });
            
            app.MapScalarApiReference(options =>
            {
                options
                    .WithTitle("Odatey's Fleets Management System Api")
                    .WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient)
                    .WithApiKeyAuthentication(x => x.Token = "my-api-key");
            });
        }

        app.UseCustomExceptionHandler();
        app.UseCors("Open");
        
        app.UseAuthentication();
        app.UseAuthorization();
        
        app.UseFastEndpoints();
        
        return app;
    }
    
    private static void AddSwagger(IServiceCollection services)
    {
        services.AddSwaggerGen(c =>
        {
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
                      Enter 'Bearer' [space] and then your token in the text input below.
                      \r\n\r\nExample: 'Bearer 12345abcdef'",
                Name = "Authorization",
                In = ParameterLocation.Header,
                Type = SecuritySchemeType.ApiKey,
                Scheme = "Bearer"
            });

            c.AddSecurityRequirement(new OpenApiSecurityRequirement()
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                        },
                        Scheme = "oauth2",
                        Name = "Bearer",
                        In = ParameterLocation.Header,

                    },
                    new List<string>()
                }
            });

            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Version = "v1",
                Title = "Odaty's Fleets Management System Api",

            });

            // c.OperationFilter<FileResultContentTypeOperationFilter>();
        });
    }
}