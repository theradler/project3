# Generated by Django 2.0.7 on 2018-07-31 22:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_auto_20180731_1857'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='toppings',
            options={'verbose_name': 'Toppings', 'verbose_name_plural': 'Toppings'},
        ),
        migrations.RenameField(
            model_name='order',
            old_name='order',
            new_name='orderItems',
        ),
    ]
