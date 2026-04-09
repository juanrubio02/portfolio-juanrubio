from __future__ import annotations

from alembic import op
import sqlalchemy as sa


revision = "20260331_0002"
down_revision = "20260331_0001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("projects", sa.Column("repository_url", sa.String(length=512), nullable=True))

    op.alter_column(
        "experiences",
        "location",
        existing_type=sa.String(length=120),
        nullable=True,
    )
    op.alter_column(
        "experiences",
        "employment_type",
        existing_type=sa.String(length=60),
        nullable=True,
    )
    op.alter_column(
        "experiences",
        "start_date",
        existing_type=sa.Date(),
        nullable=True,
    )


def downgrade() -> None:
    op.alter_column(
        "experiences",
        "start_date",
        existing_type=sa.Date(),
        nullable=False,
    )
    op.alter_column(
        "experiences",
        "employment_type",
        existing_type=sa.String(length=60),
        nullable=False,
    )
    op.alter_column(
        "experiences",
        "location",
        existing_type=sa.String(length=120),
        nullable=False,
    )

    op.drop_column("projects", "repository_url")
