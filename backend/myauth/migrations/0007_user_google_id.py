# Generated by Django 4.2.7 on 2023-12-17 08:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myauth', '0006_user_following'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='google_id',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
    ]
