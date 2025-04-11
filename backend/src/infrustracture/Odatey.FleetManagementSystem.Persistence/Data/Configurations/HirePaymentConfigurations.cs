namespace Odatey.FleetManagementSystem.Repositories.Data.Configurations;

public class HirePaymentConfigurations : IEntityTypeConfiguration<HirePayment>
{
    public void Configure(EntityTypeBuilder<HirePayment> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(a => a.Id)
            .HasConversion(a => a.Value, dbId => HirePaymentId.Of(dbId));
        builder.Property(a => a.VehicleId).HasConversion(a => a.Value, dbId => VehicleId.Of(dbId));
    }
}