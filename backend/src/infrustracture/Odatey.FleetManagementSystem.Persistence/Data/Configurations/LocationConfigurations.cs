namespace Odatey.FleetManagementSystem.Repositories.Data.Configurations;

public class LocationConfigurations : IEntityTypeConfiguration<Location>
{
    public void Configure(EntityTypeBuilder<Location> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(a => a.Id)
            .HasConversion(a => a.Value, dbId => LocationId.Of(dbId));
        builder.Property(a => a.VehicleId).HasConversion(a => a.Value, dbId => VehicleId.Of(dbId));
    }
}