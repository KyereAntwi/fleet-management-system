using Odatey.FleetManagementSystem.Domain.Tenants.Enums;

namespace Odatey.FleetManagementSystem.Persistence.TenantsManagement.Data.Configurations;

public class TenantsConfigurations : IEntityTypeConfiguration<Tenant>
{
    public void Configure(EntityTypeBuilder<Tenant> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Id).HasConversion(tenantId => tenantId.Value, dbId => TenantId.of(dbId));
        
        builder
            .HasMany(t => t.ApplicationUsers)
            .WithOne()
            .HasForeignKey(a => a.TenantId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.Property(t => t.Subscription)
            .HasDefaultValue(Subscription.Free)
            .HasConversion(t => t.ToString(),
                dbType => (Subscription)Enum.Parse(typeof(Subscription), dbType));
    }
}