"""add is_admin to users

Revision ID: b99ac05d4dd7
Revises: 9b0448c895e4
Create Date: 2026-04-10 19:17:49.732271

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b99ac05d4dd7'
down_revision = '9b0448c895e4'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column('users', sa.Column('is_admin', sa.Boolean(), nullable=False, server_default='false'))


def downgrade() -> None:
    op.drop_column('users', 'is_admin')
