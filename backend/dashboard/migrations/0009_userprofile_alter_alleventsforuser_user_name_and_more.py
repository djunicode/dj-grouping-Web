# Generated by Django 4.0.3 on 2022-04-25 14:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('dashboard', '0008_alter_alleventsforgroup_group_name_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('branch', models.CharField(max_length=250)),
                ('year_of_passing', models.IntegerField()),
                ('sap_id', models.CharField(max_length=12)),
                ('mobile_no', phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None, unique=True)),
                ('profile_pic', models.ImageField(default='profile/default.jpg', upload_to='profile/')),
                ('bio', models.TextField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterField(
            model_name='alleventsforuser',
            name='user_name',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='dashboard.userprofile'),
        ),
        migrations.AlterField(
            model_name='eventregisterations',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='dashboard.userprofile'),
        ),
        migrations.AlterField(
            model_name='group',
            name='group_individual',
            field=models.ManyToManyField(to='dashboard.userprofile'),
        ),
    ]
