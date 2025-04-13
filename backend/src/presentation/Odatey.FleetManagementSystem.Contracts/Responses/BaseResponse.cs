namespace Odatey.FleetManagementSystem.Contracts.Responses;

public class BaseResponse<TResponse> where TResponse : notnull
{
    public bool Success { get; set; }
    public TResponse Data { get; set; }
    public string Message { get; set; }
    public int StatusCode { get; set; }
    public IEnumerable<string> Erross { get; set; } = [];
}