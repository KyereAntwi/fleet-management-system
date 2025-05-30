namespace Odatey.FleetManagementSystem.Repositories.Data.Configurations;

public class VehicleConfigurations : IEntityTypeConfiguration<Vehicle>
{
    public void Configure(EntityTypeBuilder<Vehicle> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id)
            .HasConversion(vehicleId => vehicleId.Value, dbId => VehicleId.Of(dbId));
        
        builder
            .Property(x => x.WorkspaceId)
            .HasConversion(workspaceId => workspaceId.Value, dbId => WorkspaceId.Of(dbId))
            .IsRequired();
        
        builder
            .HasMany(v => v.FuelConsumptions)
            .WithOne()
            .HasForeignKey(f => f.VehicleId);
        
        builder
            .HasMany(v => v.MaintenanceCosts)
            .WithOne()
            .HasForeignKey(m => m.VehicleId);
        
        builder
            .HasMany(v => v.AccidentRepairCosts)
            .WithOne()
            .HasForeignKey(a => a.VehicleId);
        
        builder
            .HasMany(v => v.HirePayments)
            .WithOne()
            .HasForeignKey(a => a.VehicleId);
        
        builder
            .HasMany(v => v.Locations)
            .WithOne()
            .HasForeignKey(a => a.VehicleId);
    }
}