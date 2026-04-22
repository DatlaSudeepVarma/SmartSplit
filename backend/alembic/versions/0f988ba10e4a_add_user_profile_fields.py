"""add_user_profile_fields
Revision ID: 0f988ba10e4a
Revises: f3f00c65e9f3
Create Date: 2026-04-14 20:39:01.286229
"""
from alembic import op
import sqlalchemy as sa


revision = '0f988ba10e4a'
down_revision = 'f3f00c65e9f3'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column('users', sa.Column('phone_number', sa.String(), nullable=True))
    op.add_column('users', sa.Column('default_currency', sa.String(), nullable=True))
    op.add_column('users', sa.Column('timezone', sa.String(), nullable=True))
    op.add_column('users', sa.Column('language', sa.String(), nullable=True))
    op.add_column('users', sa.Column('notification_settings', sa.Text(), nullable=True))
    op.execute("UPDATE users SET default_currency = 'INR' WHERE default_currency IS NULL")
    op.execute("UPDATE users SET timezone = 'UTC' WHERE timezone IS NULL")
    op.execute("UPDATE users SET language = 'en' WHERE language IS NULL")

def downgrade() -> None:
    op.drop_column('users', 'notification_settings')
    op.drop_column('users', 'language')
    op.drop_column('users', 'timezone')
    op.drop_column('users', 'default_currency')
    op.drop_column('users', 'phone_number')








