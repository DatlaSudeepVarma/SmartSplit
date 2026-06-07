"""add daily expenses tables

Revision ID: c8e1f2a3b4d5
Revises: 267bc64a5aa2
Create Date: 2026-06-07 00:00:00.000000

"""

from alembic import op
import sqlalchemy as sa


revision = "c8e1f2a3b4d5"
down_revision = "267bc64a5aa2"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "daily_categories",
        sa.Column("id", sa.String(), nullable=False),
        sa.Column("user_id", sa.String(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("icon", sa.String(), nullable=False),
        sa.Column("color", sa.String(), nullable=False),
        sa.Column("is_custom", sa.Boolean(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_daily_categories_user_id", "daily_categories", ["user_id"])

    op.create_table(
        "daily_expenses",
        sa.Column("id", sa.String(), nullable=False),
        sa.Column("user_id", sa.String(), nullable=False),
        sa.Column("description", sa.String(), nullable=False),
        sa.Column("amount", sa.Float(), nullable=False),
        sa.Column("date", sa.DateTime(), nullable=False),
        sa.Column("category_id", sa.String(), nullable=False),
        sa.Column("payment_method", sa.String(), nullable=False),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("source_id", sa.String(), nullable=True),
        sa.Column("source_type", sa.String(), nullable=True),
        sa.Column("metadata_json", sa.Text(), nullable=True),
        sa.ForeignKeyConstraint(["category_id"], ["daily_categories.id"]),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_daily_expenses_user_id", "daily_expenses", ["user_id"])


def downgrade() -> None:
    op.drop_index("ix_daily_expenses_user_id", table_name="daily_expenses")
    op.drop_table("daily_expenses")
    op.drop_index("ix_daily_categories_user_id", table_name="daily_categories")
    op.drop_table("daily_categories")
