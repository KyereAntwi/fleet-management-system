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
                    Erross = [..new string[] { badFileExtensionException.Message }]
                });
                break;
            
            case BadRequestException badRequestException:
                httpStatusCode = HttpStatusCode.BadRequest;
                result = JsonSerializer.Serialize(new BaseResponse<string>
                {
                    StatusCode = 400,
                    Success = false,
                    Message = "Client error.",
                    Erross = [..new string[] { badRequestException.Message }]
                });
                break;
            
            case NotFoundException notFoundException:
                httpStatusCode = HttpStatusCode.NotFound;
                result = JsonSerializer.Serialize(new BaseResponse<string>
                {
                    StatusCode = 404,
                    Success = false,
                    Message = "Client error.",
                    Erross = [..new string[] { notFoundException.Message }]
                });
                break;
            
            default:
                httpStatusCode = HttpStatusCode.InternalServerError;
                result = JsonSerializer.Serialize(new BaseResponse<string>
                {
                    StatusCode = 500,
                    Success = false,
                    Message = "Server Error.",
                    Erross = [..new string[] { exception.Message }]
                });
                break;
        }
        
        context.Response.StatusCode = (int)httpStatusCode;
        
        return context.Response.WriteAsync(result);
    }
}