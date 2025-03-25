namespace Odatey.FleetManagementSystem.Repositories.Data.Configurations;

public class FuelConsumedConfigurations : IEntityTypeConfiguration<FuelConsumed>
{
    public void Configure(EntityTypeBuilder<FuelConsumed> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(a => a.Id)
            .HasConversion(a => a.Value, dbId => FuelConsumedId.Of(dbId));
        builder.Property(a => a.VehicleId).HasConversion(a => a.Value, dbId => VehicleId.Of(dbId));
    }
}