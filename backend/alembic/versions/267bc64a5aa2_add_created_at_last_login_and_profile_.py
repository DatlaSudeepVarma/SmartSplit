"""Add created_at last_login and profile_image_url to User

Revision ID: 267bc64a5aa2
Revises: 0f988ba10e4a
Create Date: 2026-04-15 14:09:14.875572

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '267bc64a5aa2'
down_revision = '0f988ba10e4a'
branch_labels = None
depends_on = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
