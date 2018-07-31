# Generated by Django 2.0.7 on 2018-07-31 23:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0005_delete_submitedorder'),
    ]

    operations = [
        migrations.CreateModel(
            name='submitedOrder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('orderItems', models.CharField(blank=True, max_length=1000, null=True)),
                ('totalPrice', models.DecimalField(decimal_places=2, max_digits=12)),
                ('orderedBy', models.CharField(blank=True, max_length=100, null=True)),
                ('orderTime', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]