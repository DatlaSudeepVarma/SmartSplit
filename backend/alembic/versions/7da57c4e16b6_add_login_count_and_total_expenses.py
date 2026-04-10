"""add login_count and total_expenses

Revision ID: 7da57c4e16b6
Revises: b99ac05d4dd7
Create Date: 2026-04-10 19:46:32.438702

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7da57c4e16b6'
down_revision = 'b99ac05d4dd7'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column('users', sa.Column('login_count', sa.Integer(), nullable=False, server_default='0'))
    op.add_column('users', sa.Column('total_expenses', sa.Float(), nullable=False, server_default='0.0'))


def downgrade() -> None:
    op.drop_column('users', 'total_expenses')
    op.drop_column('users', 'login_count')
