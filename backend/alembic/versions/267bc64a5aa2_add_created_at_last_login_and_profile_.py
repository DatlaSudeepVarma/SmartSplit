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
    op.add_column('users', sa.Column('profile_image_url', sa.String(), nullable=True))
    op.add_column('users', sa.Column('created_at', sa.DateTime(), nullable=True))
    op.add_column('users', sa.Column('last_login', sa.DateTime(), nullable=True))
    # Initialize created_at for existing users
    op.execute("UPDATE users SET created_at = NOW() WHERE created_at IS NULL")
    # Make created_at non-nullable after initialization if desired, 
    # but the model says it's mapped to datetime (not datetime | None), 
    # so it should ideally be non-nullable with a default.
    # However, let's stick to what's needed to fix the error first.


def downgrade() -> None:
    op.drop_column('users', 'last_login')
    op.drop_column('users', 'created_at')
    op.drop_column('users', 'profile_image_url')
