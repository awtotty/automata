# import numpy as np
import os, time 
from random import random


# rule stuff

def count_set_bits(n): 
    '''
        Counts the number of bits in the binary representation of n
        that are set to 1. 
    '''
    binary = bin(n)[2:]; 
    return len([binary[i] for i in range(0, len(binary)) if binary[i] == '1'])

def get_state(rule, curr_state): 
    '''
        Returns the future state of a given neighborhood using the given rule. 
        The current state is represented as a string of length 9, 
        'abcdefghi' corresponding to the 2D configuration 

            a b c
            d e f
            g h i 

        where each place is either 0 for dead or 1 for alive. 
    ''' 
    return rule[-int(curr_state, 2)-1]

def get_conway_rule(): 
    '''
        Generates the rule number for Conway's GoL. 
        Since GoL is a 2D automaton, there are 2^9=512 bits
        that need to be determined to be either 0 or 1. 
    '''
    c = '' 

    # for each digit in a 2D automaton rule
    for i in range(512): 
        # count the number of bits alive in the group of 9
        count = count_set_bits(i)    
        # check the center bit of this group of 9
        alive = (i >> 4) % 2 == 1           
        
        if alive: 
            # if a living cell has 2 or 3 living neighbors, it lives
            c += '1' if count == 3 or count == 4 else '0'
        else: 
            # if a dead cell has 3 living neighbors, it lives
            c += '1' if count == 3 else '0'

    # reverse the generated string
    return c[::-1]

def get_random_rule(): 
    '''
        Generates a random rule for 2D automaton. 
    '''
    rule = ''

    for i in range(512): 
        rule += '1' if random() < 0.3 else '0'

    return rule 

def apply_rule_to_world(rule, world): 
    ''' 
        Applies a 2D rule to a 2D automaton. World is a list of strings 
        where each char is 0 for dead and 1 for alive. 
        
        A new world is returned, leaving the original unchanged.  
    '''
    new_world = []
    for r in range(len(world)): 
        new_row = '' 
        for c in range(len(world[r])): 
            # create a group of 9 representing the neighborhood 
            neighborhood = [ world[(r+i)%len(world)][(c+j)%len(world[r])] for i in range(-1,2) for j in range(-1,2)]
            neighborhood = ''.join(neighborhood)
            # apply rule to this cell
            new_row += get_state(rule, neighborhood)
        new_world.append(new_row)
    return new_world





# display stuff

def print_world(world, title=None, dead='0', alive='1'): 
    '''
        Prints the given world in 2D form to console
    '''
    os.system('cls' if os.name=='nt' else 'clear')
    if title: 
        print(title)
    for row in world: 
        for cell in row: 
            print(dead if cell=='0' else alive, end='')
        print()
    print()

def animate_world(world, rule, gens=20, delay=0.05, dead='0', alive='1', title=None): 
    '''
        Animates the world in the command line 
    '''
    for i in range(gens): 
        print_world(world, title, dead, alive)
        time.sleep(delay)
        world = apply_rule_to_world(rule, world)



# world stuff

def get_formatted_world(world, dead, alive): 
    '''
        Returns a properly formated world (0 for dead, 1 for alive) 
        from the given world where the dead param specifies the current
        encoding for dead and the alive param specifies the current encoding 
        for alive. 

        The world param is not modified in place. 
    '''
    new_world = []
    for row in world: 
        row = row.replace(dead, '0')
        row = row.replace(alive, '1')
        new_world.append(row)
    return new_world


# demo

gol_rule = get_conway_rule()
# print(gol_rule + '\n')
    # 00000000000000000000000000000000000000000000000100000000000000010000000000000001
    # 00000000000000010000000100010111000000010001011000000000000000010000000000000001
    # 00000001000101110000000100010110000000010001011100000001000101100001011101111110
    # 00010110011010000000000000000001000000000000000100000001000101110000000100010110
    # 00000001000101110000000100010110000101110111111000010110011010000000000100010111
    # 00000001000101100001011101111110000101100110100000010111011111100001011001101000
    # 01111110111010000110100010000000
# print(str(int(gol_rule, 2)) + '\n')
    # 47634829485252037513200973884082471888288955642325528262910887637847274372981720
    # 534370017768342996036219492316860704401273651054628223608960

# print(get_state(gol_rule, '000011011'))

glider = [ 
            '.......', 
            '.......', 
            '..*....', 
            '*.*....', 
            '.**....', 
            '.......', 
        ]
glider = get_formatted_world(glider, '.', '*')

gosper_glider_gun = [
            '......................................', 
            '......................................', 
            '......................................', 
            '......................................', 
            '......................................', 
            '......................................', 
            '.........................*............', 
            '.......................*.*............', 
            '.............**......**............**.', 
            '............*...*....**............**.', 
            '.**........*.....*...**...............', 
            '.**........*...*.**....*.*............', 
            '...........*.....*.......*............', 
            '............*...*.....................', 
            '.............**.......................', 
            '......................................', 
            '......................................', 
            '......................................', 
            '......................................', 
            '......................................', 
        ]
gosper_glider_gun = get_formatted_world(gosper_glider_gun, '.', '*')


animate_world(world=glider, rule=gol_rule, gens=50, delay=0.1, dead='.', alive='O', title='Glider')
animate_world(world=gosper_glider_gun, rule=gol_rule, gens=100, delay=0.05, dead='.', alive='O', title='Gosper')
# animate_world(world=gosper_glider_gun, rule=get_random_rule(), gens=100, delay=0.05, dead='.', alive='O', title='Random rule')