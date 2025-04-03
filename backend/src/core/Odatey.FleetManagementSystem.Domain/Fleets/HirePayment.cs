namespace Odatey.FleetManagementSystem.Domain.Fleets;

public class HirePayment : BaseEntity<HirePaymentId>
{
    protected HirePayment() { }

    internal HirePayment(VehicleId vehicleId, double payment, DateTime? date)
    {
        Id = HirePaymentId.Of(Guid.NewGuid());
        VehicleId = vehicleId;
        Payment = payment;
        CreatedAt = date;
    }

    public VehicleId VehicleId { get; set; }
    public double Payment { get; set; }
}