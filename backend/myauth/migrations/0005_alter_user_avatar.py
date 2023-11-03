# Generated by Django 4.2.4 on 2023-11-03 09:12

from django.db import migrations
import imagekit.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('myauth', '0004_alter_user_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=imagekit.models.fields.ProcessedImageField(blank=True, upload_to='avatar'),
        ),
    ]
