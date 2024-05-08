while (both Pokemon have HP > 0) {
    // Calculate damage multiplier based on attacking and defending Pokemon types
    multiplier = calculateDamageMultiplier(attackingPokemonType, defendingPokemonType);

    // Calculate damage inflicted by the attacking Pokemon
    damage = calculateDamage(attackingPokemonStats, defendingPokemonStats);

    // Apply damage multiplier
    damage *= multiplier;

    // Check for critical hits
    if (isCriticalHit()) {
        damage *= CRITICAL_HIT_MULTIPLIER;
    }

    // Apply damage to defending Pokemon
    defendingPokemonHP -= damage;

    // Check if defending Pokemon has fainted
    if (defendingPokemonHP <= 0) {
        // Defending Pokemon has fainted, declare attacking Pokemon as winner
        declareWinner(attackingPokemon);
        break; // End battle
    }

    // Swap roles of attacking and defending Pokemon
    swap(attackingPokemon, defendingPokemon);
}

// If loop exits, both Pokemon have fainted, declare draw
declareDraw();
