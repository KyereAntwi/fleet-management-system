using Odatey.FleetManagementSystem.Domain.Exceptions;

namespace Odatey.FleetManagementSystem.Api.Middlewares;

public class ExceptionHandler
{
    private readonly RequestDelegate _next;

    public ExceptionHandler(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception e)
        {
            await ConvertException(context, e);
        }
    }

    private Task ConvertException(HttpContext context, Exception exception)
    {
        HttpStatusCode httpStatusCode;
        
        context.Response.ContentType = "application/json";
        
        var result = string.Empty;

        switch (exception)
        {
            case BadFileExtensionException badFileExtensionException:
                httpStatusCode = HttpStatusCode.UnprocessableContent;
                result = JsonSerializer.Serialize(new BaseResponse<string>
                {
                    StatusCode = 422,
                    Success = false,
                    Message = "Client error.",
                    Erross = [..new[] { badFileExtensionException.Message }]
                });
                break;
            
            case BadRequestException badRequestException:
                httpStatusCode = HttpStatusCode.BadRequest;
                result = JsonSerializer.Serialize(new BaseResponse<string>
                {
                    StatusCode = 400,
                    Success = false,
                    Message = "Client error.",
                    Erross = [..new[] { badRequestException.Message }]
                });
                break;
            
            case NotFoundException notFoundException:
                httpStatusCode = HttpStatusCode.NotFound;
                result = JsonSerializer.Serialize(new BaseResponse<string>
                {
                    StatusCode = 404,
                    Success = false,
                    Message = "Client error.",
                    Erross = [..new[] { notFoundException.Message }]
                });
                break;
            
            case DomainExceptions domainException:
                httpStatusCode = HttpStatusCode.UnprocessableEntity;
                result = JsonSerializer.Serialize(new BaseResponse<string>
                {
                    StatusCode = (int)HttpStatusCode.UnprocessableEntity,
                    Success = false,
                    Message = "Client error",
                    Erross = [..new[] { domainException.Message }]
                });
                break;
            default:
                httpStatusCode = HttpStatusCode.InternalServerError;
                result = JsonSerializer.Serialize(new BaseResponse<string>
                {
                    StatusCode = 500,
                    Success = false,
                    Message = "Server Error.",
                    Erross = [..new[] { exception.Message }]
                });
                break;
        }
        
        context.Response.StatusCode = (int)httpStatusCode;
        
        return context.Response.WriteAsync(result);
    }
}